import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Analytics event:", body);
    return NextResponse.json({ message: "Event tracked" });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { message: "Error tracking event" },
      { status: 500 },
    );
  }
}
