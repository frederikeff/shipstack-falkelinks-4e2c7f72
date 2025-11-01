import { NextRequest, NextResponse } from 'next/server';
import { appendFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = {
      ...body,
      timestamp: new Date().toISOString(),
    };
    const logEntry = JSON.stringify(event) + '\n';

    const logPath = join(process.cwd(), 'analytics.log');
    await appendFile(logPath, logEntry);

    return NextResponse.json({ message: 'Event tracked' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
