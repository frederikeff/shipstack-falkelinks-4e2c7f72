/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises', () => ({
  appendFile: jest.fn(),
}));

describe('POST /api/track', () => {
  it('should track an event and return a 200 status code', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ eventName: 'test_event', data: { foo: 'bar' } }),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(fs.appendFile).toHaveBeenCalled();
  });
});
