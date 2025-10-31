// src/app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }
    console.log(`[Analytics] Click tracked for URL: ${url}`);
    return NextResponse.json({ message: 'Tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
