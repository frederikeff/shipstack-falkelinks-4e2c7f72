/**
 * @jest-environment node
 */

import { POST } from '@/app/api/track/route';
import { NextRequest, NextResponse } from 'next/server';

// Mock NextResponse to allow testing of the API route
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body, init) => ({
      status: init?.status || 200,
      json: () => Promise.resolve(body),
    })),
  },
}));

describe('POST /api/track', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log the href and return a 200 response', async () => {
    const href = 'https://example.com';
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ href }),
    });

    const res = await POST(req);

    expect(consoleSpy).toHaveBeenCalledWith(`[Analytics] Link clicked: ${href}`);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.message).toBe('Tracked');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Tracked' },
      { status: 200 }
    );
  });

  it('should return a 400 response if href is missing', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toBe('Missing href');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Missing href' },
      { status: 400 }
    );
  });

  it('should return a 500 response for invalid JSON', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: 'invalid-json',
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.message).toBe('Internal Server Error');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  });
});
