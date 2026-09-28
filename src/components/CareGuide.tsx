import React from 'react';
import { FLOWER_CARE_TIPS } from '../data/floristData';
import { Droplets } from 'lucide-react';

export const CareGuide: React.FC = () => {
  return (
    <section id="care-guide" className="py-16 sm:py-20 bg-[#faf7f5] border-t border-[#eae3db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9384e] mb-2">
            <Droplets className="w-3.5 h-3.5" />
            Florist Wisdom
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            How to Preserve Your Flowers
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Four simple practices recommended by our 10Roses florists to extend your arrangement's freshness up to 10–14 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLOWER_CARE_TIPS.map((tip) => (
            <div
              key={tip.step}
              className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:border-stone-300 transition-colors"
            >
              <span className="text-2xl font-serif font-bold text-[#b9384e] mb-3 block">
                {tip.step}
              </span>
              <h3 className="text-sm font-semibold text-stone-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
