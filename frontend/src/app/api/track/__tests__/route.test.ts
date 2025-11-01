/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn((body, init) => ({
        ...init,
        json: () => Promise.resolve(body),
      })),
    },
  };
});

describe('POST /api/track', () => {
  it('should return 200 and log the URL', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Click tracked for URL: https://example.com');
    consoleSpy.mockRestore();
  });

  it('should return 400 if URL is not provided', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('should return 500 on error', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: 'invalid json',
    });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const response = await POST(req);
    expect(response.status).toBe(500);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
