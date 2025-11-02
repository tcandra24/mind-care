import { NextResponse, NextRequest } from "next/server";
import { fetch } from "@/lib/actions/dashboard.action";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const response = await fetch(user_id as string);

    return NextResponse.json({
      success: true,
      response: response,
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
