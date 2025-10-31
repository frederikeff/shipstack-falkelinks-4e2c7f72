/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

describe('/api/track', () => {
  it('should track an event and return a success message', async () => {
    const requestBody = {
      event: 'test_event',
      title: 'Test Title',
      href: '/test-href',
    };
    const request = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ message: 'Event tracked' });
  });
});
