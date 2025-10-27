import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('Tracking event:', body);
  return NextResponse.json({ message: 'Event tracked' });
}