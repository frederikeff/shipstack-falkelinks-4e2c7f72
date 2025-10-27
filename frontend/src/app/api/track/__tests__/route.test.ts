/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';

describe('POST /api/track', () => {
  it('should return a 200 response', async () => {
    const request = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'test', data: 'test' }),
    });
    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ message: 'Event tracked' });
  });
});