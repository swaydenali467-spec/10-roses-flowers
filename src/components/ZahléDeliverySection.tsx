import React from 'react';
import { MapPin, Clock, Truck, ShieldCheck, Phone, MessageCircle, Globe } from 'lucide-react';
import { SHOP_INFO, DELIVERY_ZONES } from '../data/floristData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const ZahléDeliverySection: React.FC = () => {
  return (
    <section id="delivery" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9384e] mb-2">
            <Truck className="w-3.5 h-3.5" />
            Local Zahlé & Bekaa Service
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Delivery & Haouch El Omaraa Boutique
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Hand-delivering fresh flowers throughout Zahlé, Berdawny, Ksara, and the wider Bekaa with temperature-safe floral transport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Shop Information Card */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#b9384e] uppercase tracking-wider">
                  Boutique Location
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  Visit Us in Haouch El Omaraa
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Step in to select freshly cut stems in person, or pick up your pre-arranged order in minutes.
                </p>
              </div>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-[#b9384e] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Address</strong>
                    <span>{SHOP_INFO.location}</span>
                    <span className="block text-stone-500 text-[11px] mt-0.5">{SHOP_INFO.landmark}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-[#1e382b] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Opening Hours</strong>
                    <span>{SHOP_INFO.openingHoursDisplay}</span>
                    <span className="block text-emerald-700 text-[11px] mt-0.5">Open every day including Sundays</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-stone-800 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Direct Contacts</strong>
                    <a href={`tel:${SHOP_INFO.phoneRaw}`} className="hover:underline font-mono text-stone-900">
                      {SHOP_INFO.phoneDisplay}
                    </a>
                    <span className="block text-stone-500 text-[11px] mt-0.5">Voice calls & WhatsApp 24/7 messages</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-indigo-700 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Sending from Diaspora?</strong>
                    <span className="text-stone-600">
                      Ordering for family in Zahlé from abroad? We accept OMT, Whish Money, and international remittances.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-2">
              <a
                href={createWhatsAppUrl('Hello 10Roses! I need help with directions to your Haouch El Omaraa shop.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#1e382b] hover:bg-[#162a20] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ask for Location Pin</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shop</span>
              </a>
            </div>
          </div>

          {/* Delivery Coverage Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Zahlé Neighborhood Coverage & Fees
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Orders placed before 5:00 PM are eligible for same-day delivery.
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md font-medium border border-emerald-200/50 self-start sm:self-auto">
                  Same-Day Guarantee
                </span>
              </div>

              {/* Table of zones */}
              <div className="divide-y divide-stone-100">
                {DELIVERY_ZONES.map((zone) => (
                  <div key={zone.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-stone-900 block">
                        {zone.name}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {zone.area} · Est. {zone.estimatedTime}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-stone-900">
                        {zone.feeUsd === 0 ? 'FREE' : `$${zone.feeUsd} USD`}
                      </span>
                      {zone.feeUsd === 0 && (
                        <span className="block text-[10px] text-emerald-600">Local Pickup</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 bg-stone-50 p-4 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-stone-600">
                <strong className="text-stone-900">Water-Vial Hydration on Arrival:</strong> All delivered bouquets are transported in specialized floral water reservoirs to ensure pristine petal freshness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
