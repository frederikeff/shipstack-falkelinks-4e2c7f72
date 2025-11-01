import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return new NextResponse(JSON.stringify({ message: "URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(`[Analytics] Click tracked for: ${url}`);
    return new NextResponse(
      JSON.stringify({ message: `Click tracked for: ${url}` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[Analytics] Error tracking click:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error tracking click" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
