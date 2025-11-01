import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Analytics event:', body);
  return NextResponse.json({ message: 'Event tracked' });
}
