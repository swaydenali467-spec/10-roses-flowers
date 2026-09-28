import React from 'react';
import { MessageCircle, ArrowRight, Sparkles, MapPin, Clock, PhoneCall } from 'lucide-react';
import { SHOP_INFO } from '../data/floristData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf7f5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#eae3db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#b9384e] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b9384e]" />
              Haouch El Omaraa · Zahlé, Bekaa
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1f1a1a] tracking-tight leading-[1.1] text-balance">
              Poetic Blooms & Artisanal Bouquets in Zahlé
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              From signature velvet red Ecuadorian roses to luxury hatboxes and grand celebration centerpieces. Handcrafted with passion in Haouch El Omaraa and delivered with care across Zahlé and the Bekaa Valley.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#arrangements"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#b9384e] hover:bg-[#a22f43] text-white font-medium text-sm rounded-lg shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <span>View Arrangements</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#custom-builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-sm rounded-lg shadow-2xs transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#b9384e]" />
                <span>Design Custom Bouquet</span>
              </a>

              <a
                href={createWhatsAppUrl('Hello 10Roses Flowers! I would like to order fresh flowers in Zahlé.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm rounded-lg shadow-2xs transition-colors"
                title="Direct WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>

            {/* Quick Store Info Bar with Claim-to-Proof Adjacency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-stone-200/80">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#b9384e]/10 text-[#b9384e] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Haouch El Omaraa</h4>
                  <p className="text-xs text-stone-500">Zahlé, Bekaa Valley</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#1e382b]/10 text-[#1e382b] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{SHOP_INFO.openingHoursDisplay}</h4>
                  <p className="text-xs text-stone-500">Open 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-stone-100 text-stone-800 shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{SHOP_INFO.phoneDisplay}</h4>
                  <p className="text-xs text-stone-500">Direct Call & WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 aspect-16/11 sm:aspect-16/10">
              <img
                src={SHOP_INFO.heroImage}
                alt="10Roses Flowers Artisanal Bouquet with Fresh Roses in Zahlé"
                className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Inset Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-md max-w-sm border border-stone-200/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Fresh Daily Stems</span>
                </div>
                <p className="text-sm font-medium text-stone-900">
                  Imported Colombian & Ecuadorian Scarlet Roses
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Prepared fresh for each delivery in Zahlé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
