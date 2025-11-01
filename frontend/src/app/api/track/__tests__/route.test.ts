/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((body, init) => ({
      ...init,
      json: () => Promise.resolve(body),
    })),
  },
}));

describe('POST /api/track', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should track an event and return a 200 status code', async () => {
    const event = { eventName: 'test_event', data: { key: 'value' } };
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const res = await POST(req);

    expect(consoleLogSpy).toHaveBeenCalledWith('Analytics Event:', event);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Event tracked successfully' },
      { status: 200 }
    );
  });
});
