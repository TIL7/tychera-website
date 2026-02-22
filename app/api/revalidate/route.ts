import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret || !authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ revalidated: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    revalidateTag('siteSettings');
    const timestamp = new Date().toISOString();
    console.log(`[TYCHERA] Revalidated siteSettings tag at ${timestamp}`);
    return NextResponse.json({ revalidated: true, timestamp });
  } catch (error) {
    console.error('[TYCHERA] Revalidation error:', error);
    return NextResponse.json(
      { revalidated: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
