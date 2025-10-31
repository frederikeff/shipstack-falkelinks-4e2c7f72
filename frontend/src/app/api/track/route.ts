import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Analytics Event:', body);
    return NextResponse.json({ success: true, message: 'Event tracked' });
  } catch (error) {
    console.error('Analytics Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to track event' }, { status: 500 });
  }
}