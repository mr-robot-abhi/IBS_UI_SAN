import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const secret = request.headers.get('x-sanity-secret');
  
  // Verify secret (match this with Sanity webhook secret)
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate all paths that use Sanity content
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]');
  revalidatePath('/events');
  revalidatePath('/events/[slug]');
  revalidatePath('/case-studies');
  revalidatePath('/case-studies/[slug]');
  revalidatePath('/awards');

  return NextResponse.json({ revalidated: true });
}