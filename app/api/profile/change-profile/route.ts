import { NextResponse, NextRequest } from "next/server";
import { update } from "@/lib/actions/profile.action";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    const response = await update({ name });

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
