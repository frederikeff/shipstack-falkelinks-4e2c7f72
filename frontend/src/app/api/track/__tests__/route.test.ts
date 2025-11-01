/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('POST /api/track', () => {
  it('writes the event data to a log file', async () => {
    const eventName = 'Test Event';
    const eventData = { foo: 'bar' };
    const req = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ eventName, eventData }),
    });

    await POST(req);

    expect(fs.appendFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining(`${eventName}: ${JSON.stringify(eventData)}`)
    );
  });
});
