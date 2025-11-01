// frontend/src/app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { eventName } = await req.json();
    if (!eventName) {
      return NextResponse.json({ message: 'Event name is required' }, { status: 400 });
    }

    const logMessage = `${new Date().toISOString()} - ${eventName}\n`;
    const logFilePath = path.join(process.cwd(), 'analytics.log');

    await fs.appendFile(logFilePath, logMessage);

    return NextResponse.json({ message: 'Event tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
