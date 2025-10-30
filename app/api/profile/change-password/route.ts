import { NextResponse, NextRequest } from "next/server";
import { changePassword } from "@/lib/actions/profile.action";

export async function POST(req: Request) {
  try {
    const { old_password, new_password } = await req.json();

    const response = await changePassword({ oldPassword: old_password, newPassword: new_password });

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
