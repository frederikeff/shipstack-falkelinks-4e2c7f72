/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    NextResponse: jest.fn().mockImplementation((body, init) => {
      return {
        ...actual.NextResponse,
        status: init.status,
        json: () => Promise.resolve(JSON.parse(body)),
      };
    }),
  };
});

describe('Analytics API', () => {
  it('returns a 200 response when a valid href is provided', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ href: 'https://example.com' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
  });

  it('returns a 400 response when href is missing', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
