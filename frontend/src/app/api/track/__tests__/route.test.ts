/**
 * @jest-environment node
 */

import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

describe('Analytics API Route', () => {
  it('should track an event and return a 200 status code', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const mockRequest = {
      json: async () => ({ eventName: 'test', data: 'test' }),
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ message: 'Event tracked' });
    expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', {
      eventName: 'test',
      data: 'test',
    });

    consoleSpy.mockRestore();
  });

  it('should return a 500 status code if there is an error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockRequest = {
      json: async () => {
        throw new Error('Test error');
      },
    } as NextRequest;

    const response = await POST(mockRequest);

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({ message: 'Error tracking event' });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error tracking event:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
