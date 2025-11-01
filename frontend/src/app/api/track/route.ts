import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (url) {
      console.log(`[Analytics] Link clicked: ${url}`);
      return NextResponse.json({ message: 'Tracked' }, { status: 200 });
    }
    return NextResponse.json({ message: 'URL not provided' }, { status: 400 });
  } catch (error) {
    console.error('[Analytics] Error:', error);
    return NextResponse.json({ message: 'Error tracking link' }, { status: 500 });
  }
}
