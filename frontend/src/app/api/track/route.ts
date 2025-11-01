import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, ...rest } = body;

    if (!event) {
      return NextResponse.json({ message: 'Missing event' }, { status: 400 });
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      ...rest,
    };

    console.log(JSON.stringify(logEntry));

    return NextResponse.json({ message: 'Logged' }, { status: 200 });
  } catch (error) {
    console.error('Error processing analytics event:', error);
    if (error instanceof SyntaxError) { // Handle cases where body is not valid JSON
        return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error logging event' }, { status: 500 });
  }
}
