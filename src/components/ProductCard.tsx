import React from 'react';
import { MessageCircle, Eye, Plus } from 'lucide-react';
import { FloralProduct } from '../types';
import { SHOP_INFO } from '../data/floristData';
import { buildQuickProductMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: FloralProduct;
  currency: 'USD' | 'LBP';
  onQuickAdd: (product: FloralProduct) => void;
  onOpenDetails: (product: FloralProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickAdd,
  onOpenDetails,
}) => {
  const priceDisplay =
    currency === 'USD'
      ? `$${product.price}`
      : `${(product.price * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`;

  const originalPriceDisplay =
    product.originalPrice
      ? currency === 'USD'
        ? `$${product.originalPrice}`
        : `${(product.originalPrice * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`
      : null;

  const quickOrderWhatsAppUrl = createWhatsAppUrl(
    buildQuickProductMessage(product.name, product.price)
  );

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      {/* 65%-75% height imagery slot */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onOpenDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle non-pill metadata */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-stone-700 tracking-wide uppercase border border-stone-200/60 shadow-2xs">
          {product.categoryLabel}
        </div>

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="px-3.5 py-2 bg-white text-stone-900 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3
              onClick={() => onOpenDetails(product)}
              className="text-lg font-serif font-semibold text-stone-900 group-hover:text-[#b9384e] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Stems count / Flower types subtle metadata with typographic separator */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-4">
            <span>{product.stemsCount || 'Fresh Stems'}</span>
            <span aria-hidden="true">·</span>
            <span>Hand-tied</span>
            <span aria-hidden="true">·</span>
            <span>Zahlé Delivery</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold font-mono tabular-nums text-stone-900">
              {priceDisplay}
            </span>
            {originalPriceDisplay && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {originalPriceDisplay}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onQuickAdd(product)}
              className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Add to shopping bag"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <a
              href={quickOrderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#1e382b] hover:bg-[#162a20] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              title="Order on WhatsApp with prefilled message"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
