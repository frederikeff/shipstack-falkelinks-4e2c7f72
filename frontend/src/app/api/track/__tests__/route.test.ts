/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises');

// Mock NextResponse to avoid 'un-closed network connection' errors
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body, init) => ({
      ...init,
      json: () => Promise.resolve(body),
    })),
  },
}));

describe('/api/track', () => {
  it('should append event to analytics.log and return success', async () => {
    const eventData = { event: 'test_event', prop: 'test_prop' };
    const request = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });

    const response = await POST(request);

    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), `${JSON.stringify(eventData)}\n`);

    const jsonResponse = await response.json();
    expect(jsonResponse.message).toBe('Event tracked');
  });
});
