import { NextResponse, NextRequest } from "next/server";
import { fetch, store } from "@/lib/actions/mood.action";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const response = await fetch(user_id as string);

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
