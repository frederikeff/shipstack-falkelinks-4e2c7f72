
/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  } as Response)
);

jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body, init) => ({
      ...init,
      json: () => Promise.resolve(body),
    })),
  },
}));

describe('POST /api/track', () => {
  beforeEach(() => {
    jest.resetModules();
    (fetch as jest.Mock).mockClear();
  });

  it('should send an event to Google Analytics and return a 200 response', async () => {
    process.env.GA_API_SECRET = 'test-secret';
    process.env.GA_MEASUREMENT_ID = 'test-id';

    const { POST } = await import('@/app/api/track/route');

    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'test_event', clientId: 'test-client-id', foo: 'bar' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.google-analytics.com/mp/collect?measurement_id=test-id&api_secret=test-secret',
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: 'test-client-id',
          events: [{
            name: 'test_event',
            params: {
              foo: 'bar',
            },
          }],
        }),
      }
    );
  });

  it('should return a 500 response if credentials are not configured', async () => {
    delete process.env.GA_API_SECRET;
    delete process.env.GA_MEASUREMENT_ID;

    const { POST } = await import('@/app/api/track/route');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'test_event', clientId: 'test-client-id' }),
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    expect(consoleSpy).toHaveBeenCalledWith('Google Analytics credentials are not configured.');
    consoleSpy.mockRestore();
  });
});
