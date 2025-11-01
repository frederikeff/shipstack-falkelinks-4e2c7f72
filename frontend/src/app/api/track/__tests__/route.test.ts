/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises', () => ({
  appendFile: jest.fn(),
}));

describe('/api/track', () => {
  it('logs the event to a file', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'Test Event', foo: 'bar' }),
    });

    await POST(req);

    expect(fs.appendFile).toHaveBeenCalledWith(
      expect.stringContaining('analytics.log'),
      expect.stringContaining('EVENT: Test Event, DETAILS: {"foo":"bar"}')
    );
  });
});
