import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = {
      ...body,
      timestamp: new Date().toISOString(),
    };

    const logFilePath = path.join(process.cwd(), 'analytics.log');
    await fs.appendFile(logFilePath, JSON.stringify(event) + '\n');

    return NextResponse.json({ message: 'Event tracked' });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
