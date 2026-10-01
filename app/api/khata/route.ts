import { NextResponse } from 'next/server';
import { INITIAL_KHATA_LEDGER, INITIAL_KHATA_CUSTOMER } from '@/lib/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    customer: INITIAL_KHATA_CUSTOMER,
    ledger: INITIAL_KHATA_LEDGER
  });
}
