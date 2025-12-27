import { NextResponse } from 'next/server'
import { getPropertyBySlug } from '@/lib/booking/api' // prilagodi putanju

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug)
  return NextResponse.json(property)
}
