/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';

describe('POST /api/track', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    consoleLogSpy.mockClear();
  });

  it('logs the event to the console', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'test_event', foo: 'bar' }),
    });

    await POST(req);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('{"timestamp":')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"event":"test_event"')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"foo":"bar"')
    );
  });
});
