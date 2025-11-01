/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('POST /api/track', () => {
  it('should track an event and write to the log file', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'test_event', data: 'test_data' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Event tracked');
    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), expect.stringContaining('test_event'));
  });

  it('should return 400 if event name is missing', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ data: 'test_data' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Event name is required');
  });
});
