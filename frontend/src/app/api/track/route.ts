import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, ...rest } = body;

    if (!event) {
      return NextResponse.json({ message: 'Event name is required' }, { status: 400 });
    }

    const logEntry = `${new Date().toISOString()} - ${event}: ${JSON.stringify(rest)}\n`;

    const logDir = path.resolve(process.cwd(), 'frontend');
    const logFile = path.join(logDir, 'analytics.log');

    await fs.appendFile(logFile, logEntry);

    return NextResponse.json({ message: 'Event tracked' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
