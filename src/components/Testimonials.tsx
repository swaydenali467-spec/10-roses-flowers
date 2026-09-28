import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/floristData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9384e] mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Client Reverence
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Loved Across Zahlé & Beyond
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Read authentic notes from local patrons and overseas family members who trusted us with their heartfelt moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#faf7f5] p-6 rounded-2xl border border-stone-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/70 text-xs">
                <span className="font-semibold text-stone-900 block">{t.name}</span>
                <span className="text-stone-500 text-[11px] block">{t.location}</span>
                <span className="text-[11px] text-[#b9384e] mt-1 block">
                  Arrangement: {t.item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
