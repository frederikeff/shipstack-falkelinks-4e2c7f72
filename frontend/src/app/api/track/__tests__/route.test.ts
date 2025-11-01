/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { appendFile } from 'fs/promises';

// Mock the fs/promises module
jest.mock('fs/promises', () => ({
  appendFile: jest.fn(),
}));

describe('POST /api/track', () => {
  beforeEach(() => {
    (appendFile as jest.Mock).mockClear();
  });

  it('tracks an event and returns a 200 status code', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'test-event', foo: 'bar' }),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(appendFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('EVENT: test-event, DETAILS: {"foo":"bar"}')
    );
  });

  it('returns a 400 status code if the event is missing', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ foo: 'bar' }),
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
  });
});
