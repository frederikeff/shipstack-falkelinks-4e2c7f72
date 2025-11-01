import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (url) {
      console.log(`[Analytics] Click tracked for URL: ${url}`);
      return NextResponse.json({ message: 'Tracked' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'URL not provided' }, { status: 400 });
    }
  } catch (error) {
    console.error('[Analytics] Error tracking click:', error);
    return NextResponse.json({ message: 'Error tracking click' }, { status: 500 });
  }
}
