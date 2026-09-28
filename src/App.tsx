/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { BouquetBuilder } from './components/BouquetBuilder';
import { ZahléDeliverySection } from './components/ZahléDeliverySection';
import { CareGuide } from './components/CareGuide';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FLORAL_PRODUCTS, SHOP_INFO } from './data/floristData';
import { FloralProduct, CartItem } from './types';
import { MessageCircle, Check } from 'lucide-react';
import { createWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('10roses_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FloralProduct | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'LBP'>('USD');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('10roses_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore localStorage quotas
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleQuickAdd = (product: FloralProduct) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      selectedSize: product.sizes?.[0]?.name,
      selectedStems: product.sizes?.[0]?.stems,
    };

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === newItem.selectedSize
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`Added ${product.name} to bag`);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`Added ${item.name} to bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'LBP' : 'USD'));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f5] text-stone-900 selection:bg-[#b9384e] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />

      {/* Main Flow */}
      <main className="flex-1">
        <Hero />
        <Catalog
          products={FLORAL_PRODUCTS}
          currency={currency}
          onQuickAdd={handleQuickAdd}
          onOpenDetails={(p) => setSelectedProduct(p)}
        />
        <BouquetBuilder
          currency={currency}
          onAddToCart={handleAddToCart}
        />
        <ZahléDeliverySection />
        <CareGuide />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Sticky Quick WhatsApp Ordering Floating Button (respects 15% mobile sticky cap) */}
      <aside aria-label="Quick WhatsApp assistance" className="fixed bottom-5 left-5 z-30">
        <a
          href={createWhatsAppUrl('Hello 10Roses Flowers! I have an inquiry about flowers in Zahlé.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 group text-xs font-semibold"
          title="Direct WhatsApp with 10Roses Zahlé"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </aside>
    </div>
  );
}
