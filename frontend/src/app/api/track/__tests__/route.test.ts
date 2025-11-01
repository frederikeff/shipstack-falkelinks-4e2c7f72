/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import { appendFile } from 'fs/promises';

jest.mock('fs/promises', () => ({
  appendFile: jest.fn(),
}));

jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body, init) => ({
      json: () => Promise.resolve(body),
      status: init?.status,
    })),
  },
}));

describe('POST /api/track', () => {
  it('should track an event and return a 200 status', async () => {
    const req = {
      json: async () => ({ eventName: 'Test Event' }),
    } as NextRequest;

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(appendFile).toHaveBeenCalled();
  });
});
