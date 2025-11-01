/**
 * @jest-environment node
 */
import { POST } from '@/app/api/track/route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => {
  const originalModule = jest.requireActual('next/server');
  return {
    ...originalModule,
    NextResponse: {
      json: jest.fn((body, init) => ({
        body,
        init,
        ok: true,
        status: init?.status || 200,
        statusText: 'OK',
        headers: new Headers(),
        clone: () => ({ ...this }),
        json: () => Promise.resolve(body),
        text: () => Promise.resolve(JSON.stringify(body)),
        blob: () => Promise.resolve(new Blob([JSON.stringify(body)])),
        formData: () => Promise.resolve(new FormData()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        type: 'default',
        url: '',
        redirected: false,
        trailer: Promise.resolve(new Headers()),
        bodyUsed: false,
        bodyStream: null,
        cookies: {
          set: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
          has: jest.fn(),
          delete: jest.fn(),
        },
      })),
    },
  };
});

describe('POST /api/track', () => {
  it('should return a 200 response with a success message', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const mockReq = {
      json: jest.fn().mockResolvedValue({ Categorie: 'Test', Title: 'Test Event', Url: '/test' }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
      url: '/api/track',
      nextUrl: {
        pathname: '/api/track',
      },
    } as unknown as NextRequest;
    const response = await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Event tracked' }, { status: 200 });

    consoleSpy.mockRestore();
  });

  it('should return a 500 response when an error occurs', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockReq = {
      json: jest.fn().mockRejectedValue(new Error('Test error')),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      method: 'POST',
      url: '/api/track',
      nextUrl: {
        pathname: '/api/track',
      },
    } as unknown as NextRequest;

    await POST(mockReq);

    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'Error tracking event' }, { status: 500 });
    consoleSpy.mockRestore();
  });
});
