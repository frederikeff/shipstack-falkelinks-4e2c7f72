/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track-click/route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Mock NextResponse to avoid errors in the test environment
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn().mockImplementation((data, options) => ({
      ...options,
      json: () => Promise.resolve(data),
    })),
  },
}));

describe('API Route: /api/track-click', () => {
  it('should return a 200 status code when a URL is provided', async () => {
    const req = new NextRequest('http://localhost/api/track-click', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    });
    const response = await POST(req);
    expect(response.status).toBe(200);
  });

  it('should return a 400 status code when a URL is not provided', async () => {
    const req = new NextRequest('http://localhost/api/track-click', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
