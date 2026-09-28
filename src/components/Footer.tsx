import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Heart } from 'lucide-react';
import { SHOP_INFO } from '../data/floristData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#172d23] text-stone-300 pt-16 pb-12 border-t border-[#234334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#234334]">
          {/* Col 1: Brand & Craft */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              10Roses Flowers
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Handcrafted floral arrangements, signature rose bouquets, and bespoke event styling rooted in Haouch El Omaraa, Zahlé, Lebanon.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={createWhatsAppUrl('Hello 10Roses Flowers! I would like to chat with a florist.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-400 transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Call Boutique"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#arrangements" className="hover:text-white transition-colors">
                  Classic Red Rose Bouquets
                </a>
              </li>
              <li>
                <a href="#arrangements" className="hover:text-white transition-colors">
                  Luxury Signature Flower Boxes
                </a>
              </li>
              <li>
                <a href="#arrangements" className="hover:text-white transition-colors">
                  Custom Event & Wedding Florals
                </a>
              </li>
              <li>
                <a href="#custom-builder" className="hover:text-white transition-colors">
                  Bespoke Bouquet Atelier
                </a>
              </li>
              <li>
                <a href="#care-guide" className="hover:text-white transition-colors">
                  Florist Care Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Zahlé Delivery */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Zahlé & Bekaa Service
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Haouch El Omaraa (Pickup & Local)</li>
              <li>Zahlé Boulevard & Berdawny</li>
              <li>Maallaqa, Karak & Hosh El Zaraaneh</li>
              <li>Ksara & Qaa El Rim</li>
              <li>Chtaura, Jdita & Saadnayel</li>
              <li>Rayak & Central Bekaa Valley</li>
            </ul>
          </div>

          {/* Col 4: Boutique Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Boutique & Hours
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b9384e] shrink-0 mt-0.5" />
                <span>{SHOP_INFO.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SHOP_INFO.openingHoursDisplay}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-300 shrink-0 mt-0.5" />
                <a href={`tel:${SHOP_INFO.phoneRaw}`} className="hover:underline text-white font-mono">
                  {SHOP_INFO.phoneDisplay}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-stone-500 block">Accepted Payments</span>
                <span className="text-xs text-stone-300">
                  Cash on Delivery · Whish Money · OMT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} 10Roses Flowers. Haouch El Omaraa, Zahlé, Lebanon. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-stone-400">
            Handcrafted with <Heart className="w-3 h-3 text-[#b9384e] fill-[#b9384e]" /> in Zahlé, Bekaa
          </p>
        </div>
      </div>
    </footer>
  );
};
