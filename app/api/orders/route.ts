import { NextResponse } from 'next/server';
import { INITIAL_ORDERS } from '@/lib/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: INITIAL_ORDERS
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = 'DHY-' + Math.floor(10000 + Math.random() * 90000);
    const pickupPin = Math.floor(1000 + Math.random() * 9000).toString();

    const createdOrder = {
      orderId,
      date: new Date().toLocaleString('en-IN'),
      customerName: body.customerName || 'Customer',
      customerPhone: body.customerPhone || '+91 98000 00000',
      items: body.items || [],
      deliveryMode: body.deliveryMode || 'pickup',
      pickupHub: body.pickupHub || 'Station Road Flagship Desk #02',
      pickupPin,
      pickupQr: `${orderId}-PIN${pickupPin}`,
      status: 'ready_for_pickup',
      subtotal: body.subtotal || 0,
      gst: body.gst || 0,
      deliveryFee: body.deliveryFee || 0,
      total: body.total || 0
    };

    return NextResponse.json({
      success: true,
      order: createdOrder
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 400 });
  }
}
