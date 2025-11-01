
import { NextRequest, NextResponse } from 'next/server';

const GA_API_SECRET = process.env.GA_API_SECRET;
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export async function POST(req: NextRequest) {
  if (!GA_API_SECRET || !GA_MEASUREMENT_ID) {
    console.error('Google Analytics credentials are not configured.');
    return NextResponse.json({ message: 'Analytics not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { eventName, clientId, ...params } = body;

    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{
          name: eventName,
          params,
        }],
      }),
    });

    return NextResponse.json({ message: 'Event tracked' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
