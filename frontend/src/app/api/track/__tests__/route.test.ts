
/** @jest-environment node */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      ...originalModule.NextResponse,
      json: jest.fn().mockImplementation(originalModule.NextResponse.json),
    },
  };
});

describe('POST /api/track', () => {
  it('logs the analytics event and returns a 200 status', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const eventName = 'Test Event';
    const data = { foo: 'bar' };
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName, ...data }),
    });

    await POST(req);

    expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', { eventName, ...data });
    expect(NextResponse.json).toHaveBeenCalledWith({ status: 'ok' });

    consoleSpy.mockRestore();
  });
});
