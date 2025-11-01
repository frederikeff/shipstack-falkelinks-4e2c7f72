import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { href } = await req.json();

  if (!href) {
    return new NextResponse('Missing href', { status: 400 });
  }

  // In a real application, you would send this to your analytics service
  console.log(`[Analytics] Tracked click to: ${href}`);

  return new NextResponse('OK', { status: 200 });
}
