'use client';

import React from 'react';
import { useStore } from '@/lib/store/StoreContext';

const FILTER_ITEMS = [
  { id: 'all', label: 'All Catalog' },
  { id: 'smartphones', label: '📱 Phones' },
  { id: 'OnePlus', label: 'OnePlus' },
  { id: 'Apple', label: 'Apple' },
  { id: 'Samsung', label: 'Samsung' },
  { id: 'audio', label: '🎧 Audio TWS' },
  { id: 'chargers', label: '⚡ GaN Chargers' },
  { id: 'protection', label: '🛡️ Glass & Cases' }
];

export default function BrandFilterRails() {
  const { selectedCategory, setCategory, setSearchQuery } = useStore();

  return (
    <div className="py-2 overflow-x-auto scrollbar-none px-4 flex items-center gap-2 select-none">
      {FILTER_ITEMS.map((item) => {
        const isActive = selectedCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setCategory(item.id);
              setSearchQuery('');
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 active:scale-95 ${
              isActive
                ? 'bg-[#0076DF] text-white shadow-sm ring-2 ring-[#0076DF]/20'
                : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
