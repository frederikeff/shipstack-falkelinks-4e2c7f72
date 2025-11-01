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

    const logEntry = `${new Date().toISOString()} - EVENT: ${event}, DETAILS: ${JSON.stringify(rest)}\n`;

    const logDir = path.resolve(process.cwd());
    await fs.appendFile(path.join(logDir, 'analytics.log'), logEntry);

    return NextResponse.json({ message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ message: 'Error tracking event' }, { status: 500 });
  }
}
