import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(body)}\n`;

    // In a real app, you'd send this to an analytics service.
    // For this demo, we'll append to a local file.
    const logFilePath = path.join(process.cwd(), 'analytics.log');
    await fs.appendFile(logFilePath, logEntry);

    console.log('Analytics event:', body); // Keep the console log for debugging in dev
    return NextResponse.json({ message: 'Event tracked' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
