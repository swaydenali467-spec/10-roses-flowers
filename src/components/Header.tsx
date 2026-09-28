import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Phone, Clock, Menu, X } from 'lucide-react';
import { SHOP_INFO } from '../data/floristData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: 'USD' | 'LBP';
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check Zahlé / Beirut local time (UTC+2 or UTC+3 depending on DST)
    const checkOpenStatus = () => {
      try {
        const beirutTimeStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Beirut' });
        const beirutDate = new Date(beirutTimeStr);
        const currentHour = beirutDate.getHours();
        setIsOpenNow(currentHour >= SHOP_INFO.openingHour && currentHour < SHOP_INFO.closingHour);
      } catch {
        const currentHour = new Date().getHours();
        setIsOpenNow(currentHour >= 8 && currentHour < 20);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Quiet Utility Bar */}
      <div className="bg-[#1e382b] text-[#f4efe8] text-xs py-1.5 px-4 sm:px-8 border-b border-[#284939]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-normal">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isOpenNow ? 'Open Now in Zahlé until 8:00 PM' : 'Opens at 8:00 AM Daily'}</span>
            </span>
            <span className="hidden md:inline text-white/30" aria-hidden="true">·</span>
            <span className="hidden md:inline text-white/80">Haouch El Omaraa, Zahlé</span>
            <span className="hidden lg:inline text-white/30" aria-hidden="true">·</span>
            <span className="hidden lg:inline text-white/80">Same-Day Delivery in Bekaa</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleCurrency}
              className="text-xs font-medium text-white/90 hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded bg-white/10 hover:bg-white/20"
              title="Toggle Currency Display"
            >
              Currency: <span className="font-semibold text-white">{currency}</span>
            </button>
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white transition-colors text-xs"
            >
              <Phone className="w-3 h-3" />
              <span>{SHOP_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-[#e8ded5]'
            : 'bg-[#faf7f5] border-[#eae3db]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#b9384e] hover:text-[#9e2d40] transition-colors"
          >
            10Roses Flowers
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a href="#arrangements" className="hover:text-[#b9384e] transition-colors py-1">
              Arrangements
            </a>
            <a href="#custom-builder" className="hover:text-[#b9384e] transition-colors py-1">
              Custom Bouquet
            </a>
            <a href="#delivery" className="hover:text-[#b9384e] transition-colors py-1">
              Zahlé Delivery
            </a>
            <a href="#care-guide" className="hover:text-[#b9384e] transition-colors py-1">
              Flower Care
            </a>
            <a href="#contact" className="hover:text-[#b9384e] transition-colors py-1">
              Contact & Hours
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={createWhatsAppUrl('Hello 10Roses Flowers! I would like to inquire about ordering flowers in Zahlé.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1e382b] hover:bg-[#162a20] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-stone-800 hover:text-[#b9384e] bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b9384e] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 py-5 space-y-3 shadow-lg">
            <a
              href="#arrangements"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 py-1.5 hover:text-[#b9384e]"
            >
              Arrangements & Bouquets
            </a>
            <a
              href="#custom-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 py-1.5 hover:text-[#b9384e]"
            >
              Custom Bouquet Builder
            </a>
            <a
              href="#delivery"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 py-1.5 hover:text-[#b9384e]"
            >
              Zahlé Delivery & Coverage
            </a>
            <a
              href="#care-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 py-1.5 hover:text-[#b9384e]"
            >
              Flower Care Guide
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-stone-800 py-1.5 hover:text-[#b9384e]"
            >
              Shop Info & Hours
            </a>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <a
                href={createWhatsAppUrl('Hello 10Roses Flowers! I would like to place an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1e382b] text-white text-sm font-semibold rounded-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Order via WhatsApp (+961 76 184 953)</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-stone-100 text-stone-800 text-sm font-medium rounded-lg"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>Call Boutique</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
