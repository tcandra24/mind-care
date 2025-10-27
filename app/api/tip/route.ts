import { NextResponse } from "next/server";
import { fetch, store } from "@/lib/actions/mood.action";

export async function GET(req: Request) {
  try {
    const { user_id } = await req.json();

    const response = await fetch(user_id);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { mood, note, user_id } = await req.json();

    const response = await store({ mood, note, user_id });

    return NextResponse.json({
      success: true,
      message: response,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}
