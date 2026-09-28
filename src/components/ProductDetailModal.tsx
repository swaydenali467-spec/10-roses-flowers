import React, { useState } from 'react';
import { X, MessageCircle, Plus, Check, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';
import { FloralProduct, CartItem } from '../types';
import { SHOP_INFO } from '../data/floristData';
import { buildQuickProductMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: FloralProduct | null;
  currency: 'USD' | 'LBP';
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [ribbonColor, setRibbonColor] = useState('Classic Burgundy Silk');
  const [addedToast, setAddedToast] = useState(false);

  const selectedSize = product.sizes ? product.sizes[selectedSizeIndex] : null;
  const currentPrice = selectedSize ? selectedSize.price : product.price;

  const priceDisplay =
    currency === 'USD'
      ? `$${currentPrice * quantity}`
      : `${(currentPrice * quantity * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`;

  const unitPriceDisplay =
    currency === 'USD'
      ? `$${currentPrice}`
      : `${(currentPrice * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      selectedSize: selectedSize ? selectedSize.name : undefined,
      selectedStems: selectedSize ? selectedSize.stems : undefined,
      price: currentPrice,
      quantity,
      image: product.image,
      customCardMessage: cardMessage.trim() || undefined,
      customCardRecipient: recipientName.trim() || undefined,
      customRibbonColor: ribbonColor,
    };

    onAddToCart(cartItem);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const whatsAppUrl = createWhatsAppUrl(
    buildQuickProductMessage(
      product.name,
      currentPrice * quantity,
      selectedSize?.name,
      recipientName,
      cardMessage
    )
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Product Image Column */}
          <div className="md:col-span-6 bg-stone-100 relative min-h-[300px] md:min-h-[420px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-xs font-semibold text-stone-800 uppercase tracking-wider border border-stone-200/80 shadow-2xs">
              {product.categoryLabel}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-stone-200/80 text-xs text-stone-700 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#b9384e] shrink-0" />
              <span>Available for same-day delivery in Zahlé</span>
            </div>
          </div>

          {/* Details & Customizer Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                    {unitPriceDisplay}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Flowers included */}
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Composition & Floral Notes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.flowerTypes.map((flower, i) => (
                    <span
                      key={i}
                      className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md"
                    >
                      {flower}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                    Select Bouquet Size
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.sizes.map((sz, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-3 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                          selectedSizeIndex === idx
                            ? 'border-[#b9384e] bg-[#b9384e]/5 text-stone-900 font-semibold'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{sz.name}</span>
                          <span className="font-mono font-bold">${sz.price}</span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-normal">
                          {sz.stems} stems
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ribbon Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1.5">
                  Packaging Ribbon
                </label>
                <select
                  value={ribbonColor}
                  onChange={(e) => setRibbonColor(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
                >
                  <option value="Classic Burgundy Silk">Classic Burgundy Silk</option>
                  <option value="Champagne Gold Satin">Champagne Gold Satin</option>
                  <option value="Emerald Green Velvet">Emerald Green Velvet</option>
                  <option value="Pure White Grosgrain">Pure White Grosgrain</option>
                </select>
              </div>

              {/* Complimentary Greeting Card Message */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#b9384e]" />
                    Complimentary Greeting Card
                  </span>
                  <span className="text-[11px] text-stone-400">Included free</span>
                </div>
                <input
                  type="text"
                  placeholder="Recipient Name (e.g., Dearest Layla)"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
                />
                <textarea
                  placeholder="Write a sweet message to be handwritten inside the card..."
                  rows={2}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Total</span>
                  <span className="text-xl font-bold font-mono tabular-nums text-stone-900">
                    {priceDisplay}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
