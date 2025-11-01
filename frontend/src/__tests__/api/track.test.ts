/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';

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
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should track a link click and return a 200 status', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Tracked');
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Link clicked: https://example.com');
  });

  it('should return a 400 status if no URL is provided', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('URL not provided');
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
