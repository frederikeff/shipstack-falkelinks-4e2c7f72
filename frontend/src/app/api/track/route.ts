import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const { eventName, eventData } = await req.json();

  if (!eventName || !eventData) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const logEntry = `${new Date().toISOString()} - ${eventName}: ${JSON.stringify(eventData)}\n`;

  try {
    const logFilePath = path.join(process.cwd(), 'analytics.log');
    await fs.appendFile(logFilePath, logEntry);
    return new NextResponse('Event tracked', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
