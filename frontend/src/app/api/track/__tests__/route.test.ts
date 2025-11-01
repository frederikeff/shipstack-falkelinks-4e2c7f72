/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';

describe('POST /api/track', () => {
  it('logs the event and returns a 200 response', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const mockRequest = {
      json: async () => ({ eventName: 'test-event', data: { foo: 'bar' } }),
    } as NextRequest;

    const response = await POST(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Event tracked');
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', {
      eventName: 'test-event',
      data: { foo: 'bar' },
    });

    consoleSpy.mockRestore();
  });
});
