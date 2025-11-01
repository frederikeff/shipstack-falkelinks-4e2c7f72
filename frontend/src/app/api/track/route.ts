import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logEntry = `${JSON.stringify(body)}\n`;

    // The analytics.log file will be in the root of the frontend directory
    const logFilePath = path.join(process.cwd(), 'analytics.log');

    await fs.appendFile(logFilePath, logEntry);

    return NextResponse.json({ message: 'Event tracked' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
