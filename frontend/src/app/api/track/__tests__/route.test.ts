/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextResponse } from 'next/server';

describe('POST /api/track', () => {
  it('should return a success response and log the event', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const requestBody = { eventName: 'test_event', data: 'test_data' };
    const request = new Request('http://localhost/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ success: true, message: 'Event tracked' });
    expect(consoleSpy).toHaveBeenCalledWith('Analytics Event:', requestBody);
    consoleSpy.mockRestore();
  });

  it('should return an error response if the request body is invalid', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const request = new Request('http://localhost/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ success: false, message: 'Failed to track event' });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});