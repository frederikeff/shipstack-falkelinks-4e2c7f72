/**
 * @jest-environment node
 */
import { POST } from '../route';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

describe('POST /api/track', () => {
  it('should return a 400 error if URL is not provided', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe('URL is required');
  });

  it('should return a 200 success response when URL is provided', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' }),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.message).toBe('Tracked successfully');
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Click tracked for URL: https://example.com');
    consoleSpy.mockRestore();
  });
});
