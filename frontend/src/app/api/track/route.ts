
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { url, title } = await request.json();

  if (!url || !title) {
    return new Response('Missing url or title', { status: 400 });
  }

  console.log(`[Analytics] Click event: ${title} - ${url}`);

  return new Response('Logged', { status: 200 });
}
