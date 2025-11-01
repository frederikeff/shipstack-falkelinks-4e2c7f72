/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('POST /api/track', () => {
  it('should track an event and return a 200 status code', async () => {
    const eventName = 'test-event';
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Event tracked successfully');
    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), expect.stringContaining(eventName));
  });

  it('should return a 400 status code if eventName is not provided', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Event name is required');
  });
});
