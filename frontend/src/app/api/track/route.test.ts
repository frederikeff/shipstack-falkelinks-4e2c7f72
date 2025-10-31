/**
 * @jest-environment node
 */

import { POST } from './route';
import { NextResponse } from 'next/server';

describe('Analytics API Route', () => {
  it('should track an event and return a 200 response', async () => {
    const request = new Request('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'test_click' }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Event tracked' });
  });

  it('should return a 500 response if the request body is invalid', async () => {
    const request = new Request('http://localhost/api/track', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ message: 'Error tracking event' });
  });
});
