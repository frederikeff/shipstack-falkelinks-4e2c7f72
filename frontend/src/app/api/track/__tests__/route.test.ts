/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';

jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      ...init,
      json: () => Promise.resolve(body),
    })),
  },
}));

jest.mock('fs/promises', () => ({
  appendFile: jest.fn().mockResolvedValue(undefined),
}));

describe('Analytics API Route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should track an event, write to a log file, and return a 200 status', async () => {
    const eventData = { eventName: 'Test Event', data: { foo: 'bar' } };
    const req = {
      json: jest.fn().mockResolvedValue(eventData),
    } as unknown as NextRequest;

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await POST(req);

    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), expect.stringContaining(JSON.stringify(eventData)));
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', eventData);
    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Event tracked' }, { status: 200 });

    consoleSpy.mockRestore();
  });

  it('should return a 500 status on error', async () => {
    const req = {
      json: jest.fn().mockRejectedValue(new Error('Test error')),
    } as unknown as NextRequest;

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await POST(req);

    expect(fs.appendFile).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error tracking event:', expect.any(Error));
    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Error tracking event' }, { status: 500 });

    consoleSpy.mockRestore();
  });
});
