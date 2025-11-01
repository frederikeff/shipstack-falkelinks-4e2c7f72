
/**
 * @jest-environment node
 */

import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { jest } from '@jest/globals';

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

describe('POST /api/track', () => {
  it('should log the click event and return a 200 response', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({
        url: 'https://example.com',
        title: 'Example',
      }),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(consoleLogSpy).toHaveBeenCalledWith('[Analytics] Click event: Example - https://example.com');

    consoleLogSpy.mockRestore();
  });

  it('should return a 400 response if the url or title are missing', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
  });
});
