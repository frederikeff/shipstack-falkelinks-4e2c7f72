import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Analytics event:", body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
