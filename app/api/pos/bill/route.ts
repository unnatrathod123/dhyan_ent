import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const billNo = 'DHY-POS-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleString('en-IN');

    const bill = {
      billNo,
      date,
      customerName: body.customerName || 'Walk-in Customer',
      customerPhone: body.customerPhone || '+91 98000 00000',
      items: body.items || [],
      subtotal: body.subtotal || 0,
      gstTotal: Math.round((body.subtotal || 0) * 0.18),
      discount: body.discount || 0,
      grandTotal: body.grandTotal || 0,
      tender: body.tender || 'cash',
      synced: true
    };

    return NextResponse.json({
      success: true,
      bill
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 400 });
  }
}
