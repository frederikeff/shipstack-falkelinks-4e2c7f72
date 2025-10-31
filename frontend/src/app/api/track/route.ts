import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  console.log('Tracked event:', body)
  return NextResponse.json({ message: 'Event tracked' })
}
