/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextResponse } from 'next/server';

describe('POST /api/track', () => {
  it('should return a 200 response with the correct message', async () => {
    const requestBody = { eventName: 'test', url: 'http://example.com' };
    const request = new Request('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ message: 'Event tracked' });
  });
});
