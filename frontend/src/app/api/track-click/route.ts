import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (url) {
      console.log(`[Analytics] Click tracked for URL: ${url}`);
      return NextResponse.json({ message: 'Click tracked successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'URL not provided' }, { status: 400 });
    }
  } catch (error) {
    console.error('[Analytics] Error tracking click:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
