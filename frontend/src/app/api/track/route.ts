import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  console.log('Analytics event:', body)
  return NextResponse.json({ message: 'Event tracked' })
}