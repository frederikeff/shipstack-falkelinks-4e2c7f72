/**
 * @jest-environment node
 */
import { POST } from './route';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';

// Mock console.log
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('POST /api/track', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('logs the request body and returns a 200 response', async () => {
    const testData = { href: 'https://example.com', title: 'Example' };
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(testData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Event tracked');
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', testData);
  });
});