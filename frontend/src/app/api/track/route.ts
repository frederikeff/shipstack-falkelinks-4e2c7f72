import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { href } = await req.json();
    if (href) {
      console.log(`[Analytics] Link clicked: ${href}`);
      return NextResponse.json({ message: 'Tracked' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Missing href' }, { status: 400 });
  } catch (error) {
    console.error('[Analytics] Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
