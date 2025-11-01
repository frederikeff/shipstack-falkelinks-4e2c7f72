import { NextRequest, NextResponse } from 'next/server';
import { appendFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, ...rest } = body;

    if (!event) {
      return NextResponse.json({ message: 'Event is required' }, { status: 400 });
    }

    const logEntry = `${new Date().toISOString()} - EVENT: ${event}, DETAILS: ${JSON.stringify(rest)}\n`;
    const logPath = join(process.cwd(), 'analytics.log');

    await appendFile(logPath, logEntry);

    return NextResponse.json({ message: 'Event tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
