import React, { useState } from 'react';
import { Sparkles, MessageCircle, ShoppingBag, Check, Heart, HelpCircle, Gift } from 'lucide-react';
import { CustomBouquetConfig, CartItem } from '../types';
import { SHOP_INFO, DELIVERY_ZONES } from '../data/floristData';
import { buildCustomBouquetMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface BouquetBuilderProps {
  currency: 'USD' | 'LBP';
  onAddToCart: (item: CartItem) => void;
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({
  currency,
  onAddToCart,
}) => {
  const flowerTypes = [
    {
      id: 'red-roses',
      name: 'Signature Ecuadorian Red Roses',
      pricePerStem: 2.5,
      description: 'Velvety deep scarlet roses with extended vase life',
      accentColor: 'bg-rose-900',
    },
    {
      id: 'white-roses',
      name: 'Avalanche Snow White Roses',
      pricePerStem: 2.5,
      description: 'Pristine ivory roses symbolizing purity and reverence',
      accentColor: 'bg-stone-200',
    },
    {
      id: 'blush-pink',
      name: 'Blush & Peach Garden Spray Roses',
      pricePerStem: 2.8,
      description: 'Romantic multi-bloom stems with gentle sweet fragrance',
      accentColor: 'bg-pink-300',
    },
    {
      id: 'mixed-meadow',
      name: 'Vibrant Pastel Meadow Mix',
      pricePerStem: 2.4,
      description: 'Seasonal hydrangeas, lisianthus, ranunculus & eucalyptus',
      accentColor: 'bg-emerald-300',
    },
  ];

  const stemCounts = [
    { count: 10, label: '10 Signature Roses', note: 'Our iconic namesake bouquet' },
    { count: 20, label: '20 Premium Stems', note: 'Generous and eye-catching' },
    { count: 30, label: '30 Grand Stems', note: 'Bountiful celebration size' },
    { count: 50, label: '50 Royal Stems', note: 'Grand luxury showstopper' },
  ];

  const packagingOptions = [
    {
      id: 'signature-kraft',
      name: 'Artisanal Kraft & Satin Ribbon',
      price: 5,
      description: 'Eco-friendly textured paper wrapping with matching silk ribbon',
    },
    {
      id: 'luxury-hatbox',
      name: 'Prestige Circular Hatbox',
      price: 15,
      description: 'Signature rigid flower box with hydration oasis sponge',
    },
    {
      id: 'glass-vase',
      name: 'Clear Fluted Glass Vase',
      price: 12,
      description: 'Elegant heavyweight vase, delivered arranged in water',
    },
    {
      id: 'matte-black',
      name: 'Minimalist Matte Black Luxury Wrap',
      price: 6,
      description: 'High-contrast modern Parisian wrapping with gold trim',
    },
  ];

  const initialAddOns = [
    { id: 'chocolates', name: 'Patchi Artisanal Chocolates (250g)', price: 15, selected: false },
    { id: 'balloon', name: 'Celebration Helium Balloon ("Mabrouk")', price: 5, selected: false },
    { id: 'candle', name: 'Damask Rose Scented Soy Candle', price: 12, selected: false },
    { id: 'teddy', name: 'Keepsake Plush Bear', price: 10, selected: false },
  ];

  const [selectedFlower, setSelectedFlower] = useState(flowerTypes[0]);
  const [selectedStems, setSelectedStems] = useState(stemCounts[0].count);
  const [selectedPackaging, setSelectedPackaging] = useState(packagingOptions[0]);
  const [addOns, setAddOns] = useState(initialAddOns);
  const [cardRecipient, setCardRecipient] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [deliveryArea, setDeliveryArea] = useState(DELIVERY_ZONES[0].name);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // Quick card inspiration prompts
  const cardInspirations = [
    { label: 'Birthday', text: 'Wishing you a day as radiant and beautiful as these blooms! Happy Birthday!' },
    { label: 'Love', text: 'Every petal carries my love for you. Always and forever.' },
    { label: 'Mabrouk', text: 'Alf Mabrouk! Wishing you endless happiness and success on this joyous occasion.' },
    { label: 'From Abroad', text: 'Sending you flowers all the way from across the miles to our beloved Zahlé. Thinking of you!' },
  ];

  const toggleAddOn = (id: string) => {
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  // Price calculations
  const flowersBaseTotal = Math.round(selectedFlower.pricePerStem * selectedStems);
  const packagingTotal = selectedPackaging.price;
  const addOnsTotal = addOns
    .filter((a) => a.selected)
    .reduce((sum, item) => sum + item.price, 0);
  const totalPrice = flowersBaseTotal + packagingTotal + addOnsTotal;

  const currentConfig: CustomBouquetConfig = {
    flowerType: selectedFlower.id,
    flowerName: selectedFlower.name,
    stems: selectedStems,
    basePrice: flowersBaseTotal,
    packaging: selectedPackaging,
    cardMessage,
    cardRecipient,
    addOns,
    deliveryArea,
    specialInstructions,
  };

  const handleAddToCart = () => {
    const customCartItem: CartItem = {
      id: `custom-bouquet-${Date.now()}`,
      productId: 'custom-bouquet',
      name: `Custom Bouquet (${selectedStems} ${selectedFlower.name})`,
      selectedSize: `${selectedPackaging.name}`,
      selectedStems: selectedStems,
      price: totalPrice,
      quantity: 1,
      image: SHOP_INFO.heroImage,
      customCardMessage: cardMessage.trim() || undefined,
      customCardRecipient: cardRecipient.trim() || undefined,
      customRibbonColor: selectedPackaging.name,
    };

    onAddToCart(customCartItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const whatsAppUrl = createWhatsAppUrl(
    buildCustomBouquetMessage(currentConfig, totalPrice)
  );

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-[#faf7f5] border-t border-b border-[#eae3db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b9384e] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Atelier
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Design Your Custom Bouquet
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Tailor stem counts, floral varieties, bespoke wrapping, and personalized messages for delivery anywhere in Zahlé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs">
            {/* Step 1: Flower Variety */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  01. Select Flower Variety
                </span>
                <span className="text-xs text-stone-500 font-normal">Fresh daily arrival</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flowerTypes.map((flower) => {
                  const isSelected = selectedFlower.id === flower.id;
                  return (
                    <button
                      key={flower.id}
                      onClick={() => setSelectedFlower(flower)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#b9384e] bg-[#b9384e]/5 ring-1 ring-[#b9384e]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-stone-900">
                          {flower.name}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${flower.accentColor}`} />
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2">
                        {flower.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Stem Quantity */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  02. Choose Stem Quantity
                </span>
                <span className="text-xs text-[#b9384e] font-medium">10Roses Signature</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {stemCounts.map((item) => {
                  const isSelected = selectedStems === item.count;
                  return (
                    <button
                      key={item.count}
                      onClick={() => setSelectedStems(item.count)}
                      className={`p-3 text-center rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1e382b] bg-[#1e382b] text-white shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-800 bg-white'
                      }`}
                    >
                      <span className="block text-lg font-serif font-bold tabular-nums">
                        {item.count}
                      </span>
                      <span className="block text-[11px] opacity-80 whitespace-nowrap">
                        Stems
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Packaging Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                  03. Presentation & Packaging
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packagingOptions.map((pkg) => {
                  const isSelected = selectedPackaging.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackaging(pkg)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#b9384e] bg-[#b9384e]/5 ring-1 ring-[#b9384e]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-stone-900">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-800">
                          +${pkg.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">{pkg.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Add-Ons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#b9384e]" />
                  04. Luxury Add-ons (Optional)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addOns.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      addon.selected
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-medium'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          addon.selected
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {addon.selected && <Check className="w-3 h-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-mono font-semibold">+${addon.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Greeting Card & Destination in Zahlé */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#b9384e]" />
                05. Handwritten Greeting Card & Recipient
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Recipient Name (e.g. Maria Maalouf)"
                  value={cardRecipient}
                  onChange={(e) => setCardRecipient(e.target.value)}
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
                />

                <select
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.name}>
                      Deliver to: {zone.name} ({zone.feeUsd === 0 ? 'Free' : `+$${zone.feeUsd}`})
                    </option>
                  ))}
                </select>
              </div>

              {/* Inspiration Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-stone-400">Card prompts:</span>
                {cardInspirations.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCardMessage(prompt.text)}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors cursor-pointer"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Write your personalized greeting card message..."
                rows={3}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
              />

              <input
                type="text"
                placeholder="Special floral requests or delivery instructions (optional)..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Live Order Summary Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 sticky top-24 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-semibold text-[#b9384e] uppercase tracking-wider">
                Live Atelier Preview
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Your Bespoke Arrangement
              </h3>
            </div>

            {/* Itemized breakdown */}
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>
                  {selectedStems}x {selectedFlower.name}
                </span>
                <span className="font-mono font-semibold text-stone-900">
                  ${flowersBaseTotal}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>Presentation: {selectedPackaging.name}</span>
                <span className="font-mono font-semibold text-stone-900">
                  +${packagingTotal}
                </span>
              </div>

              {addOns
                .filter((a) => a.selected)
                .map((a) => (
                  <div key={a.id} className="flex justify-between py-1 border-b border-stone-100 text-stone-700">
                    <span>Add-on: {a.name}</span>
                    <span className="font-mono font-semibold">+${a.price}</span>
                  </div>
                ))}

              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>Handwritten Card:</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>

              <div className="flex justify-between py-1">
                <span>Destination Area:</span>
                <span className="font-medium text-stone-800">{deliveryArea}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Estimate</span>
                <span className="text-xs text-stone-400">Excludes local delivery fee</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-stone-900 font-mono tabular-nums">
                  ${totalPrice}
                </span>
                {currency === 'LBP' && (
                  <span className="block text-xs font-mono text-stone-500">
                    ~{(totalPrice * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L
                  </span>
                )}
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order this Custom Bouquet on WhatsApp</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added Custom Bouquet to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-[11px] text-stone-500 flex items-center gap-2 border border-stone-200/60">
              <Sparkles className="w-3.5 h-3.5 text-[#b9384e] shrink-0" />
              <span>Prepared fresh in Haouch El Omaraa. Delivery available today.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
