
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (url) {
      console.log('Tracked click:', url);
      return NextResponse.json({ message: 'Tracked' }, { status: 200 });
    }
    return NextResponse.json({ message: 'URL not provided' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Error tracking click' }, { status: 500 });
  }
}
