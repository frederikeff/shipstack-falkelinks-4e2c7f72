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
                ...init,
                body: JSON.stringify(body),
            })),
        },
    };
});

describe('POST /api/track', () => {
    it('should return a 200 response when a URL is provided', async () => {
        const req = new NextRequest('http://localhost/api/track', {
            method: 'POST',
            body: JSON.stringify({ url: 'https://example.com' }),
        });

        const response = await POST(req);
        expect(response.status).toBe(200);
    });

    it('should return a 400 response when a URL is not provided', async () => {
        const req = new NextRequest('http://localhost/api/track', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req);
        expect(response.status).toBe(400);
    });
});
