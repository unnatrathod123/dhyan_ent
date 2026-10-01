import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  let filtered = [...INITIAL_PRODUCTS];

  if (category && category !== 'all') {
    filtered = filtered.filter(
      (p) => p.category === category || p.brand.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
}
