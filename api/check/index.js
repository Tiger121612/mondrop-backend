import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
  }

  return NextResponse.json({
    address,
    eligible: true,
    tier: 'OG',
    reasons: ['500+ transactions', '40 active days'],
    sybil: false,
    bonusTokens: 300,
    totalTokens: 800,
    rank: 42,
  });
}
