/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
    ...jest.requireActual('next/server'),
    NextResponse: {
      json: jest.fn().mockImplementation((body) => ({
        json: () => Promise.resolve(body),
        status: 200,
      })),
    },
  }));

  describe('POST /api/track', () => {
    it('should track an event and return a success message', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const testEvent = {
        event: 'test_event',
        title: 'Test Title',
        href: 'https://test.com',
      };
      const req = new NextRequest('http://localhost/api/track', {
        method: 'POST',
        body: JSON.stringify(testEvent),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(req);

      expect(consoleSpy).toHaveBeenCalledWith('Analytics event:', testEvent);
      expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Event tracked' });

      consoleSpy.mockRestore();
    });
  });
