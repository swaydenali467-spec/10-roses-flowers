import React, { useState, useMemo } from 'react';
import { FloralProduct } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, Sparkles } from 'lucide-react';

interface CatalogProps {
  products: FloralProduct[];
  currency: 'USD' | 'LBP';
  onQuickAdd: (product: FloralProduct) => void;
  onOpenDetails: (product: FloralProduct) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  currency,
  onQuickAdd,
  onOpenDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Arrangements' },
    { id: 'roses', label: 'Classic Roses' },
    { id: 'boxes', label: 'Luxury Boxes' },
    { id: 'bouquets', label: 'Seasonal Bouquets' },
    { id: 'events', label: 'Event Florals' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.flowerTypes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="arrangements" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9384e] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Boutique Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Our Featured Arrangements
            </h2>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Freshly prepared everyday in our Zahlé shop with premium stems, bespoke hydration packaging, and complimentary greeting cards.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search roses, boxes, lilies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#b9384e]/30 focus:border-[#b9384e]"
            />
          </div>
        </div>

        {/* Category Tabs (Segmented Control conforming to Zero-Pill discipline) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1e382b] text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid: 3-column desktop / 2-column tablet / 1-column mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-xl border border-stone-200 p-8">
            <p className="text-base text-stone-600 font-medium">
              No floral arrangements found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#b9384e] font-semibold hover:underline"
            >
              Reset filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onQuickAdd={onQuickAdd}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
