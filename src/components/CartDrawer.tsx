import React, { useState } from 'react';
import { X, Trash2, MessageCircle, Calendar, MapPin, User, Phone, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { SHOP_INFO, DELIVERY_ZONES } from '../data/floristData';
import { buildCartCheckoutMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'USD' | 'LBP';
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [selectedZone, setSelectedZone] = useState(DELIVERY_ZONES[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Today (ASAP)');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Afternoon (1:00 PM – 5:00 PM)');
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? selectedZone.feeUsd : 0;
  const total = subtotal + deliveryFee;

  const subtotalDisplay =
    currency === 'USD'
      ? `$${subtotal}`
      : `${(subtotal * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`;

  const totalDisplay =
    currency === 'USD'
      ? `$${total}`
      : `${(total * SHOP_INFO.usdToLbpRate).toLocaleString()} L.L`;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const whatsappUrl = createWhatsAppUrl(
      buildCartCheckoutMessage(
        items,
        subtotal,
        deliveryFee,
        selectedZone.name,
        customerName.trim() || 'Valued Customer',
        customerPhone.trim() || 'Provided on chat',
        recipientAddress.trim() || 'Zahlé (Haouch El Omaraa or to be provided)',
        deliveryDate,
        deliveryTimeSlot,
        orderNotes.trim() || undefined
      )
    );

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">
              Your Floral Bag
            </h3>
            <span className="text-xs text-stone-500">
              {items.length} {items.length === 1 ? 'item' : 'items'} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-stone-400 hover:text-red-600 transition-colors p-1"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <X className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-stone-700">Your floral bag is empty</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Explore our featured arrangements or create your bespoke bouquet in our atelier.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-[#1e382b] text-white text-xs font-semibold rounded-lg hover:bg-[#15271e] transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3 divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200/80"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedSize && (
                        <span className="block text-[11px] text-stone-500">
                          {item.selectedSize}
                        </span>
                      )}

                      {item.customCardMessage && (
                        <p className="text-[10px] text-[#b9384e] italic truncate mt-0.5">
                          Card: "{item.customCardMessage}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-md text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Zone Selector */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2.5">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b9384e]" />
                  Zahlé Delivery Zone
                </span>
                <select
                  value={selectedZone.id}
                  onChange={(e) => {
                    const zone = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                    if (zone) setSelectedZone(zone);
                  }}
                  className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg text-stone-800"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.feeUsd === 0 ? 'Free Pickup' : `+$${zone.feeUsd} USD`})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-500">
                  {selectedZone.area} · Estimated {selectedZone.estimatedTime}
                </p>
              </div>

              {/* Recipient / Customer Details Form */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
                  Delivery Details for WhatsApp Order
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street / Building / Landmark in Zahlé"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
                  >
                    <option value="Today (ASAP)">Deliver Today</option>
                    <option value="Tomorrow">Deliver Tomorrow</option>
                    <option value="Specific Date (Coordinate on WhatsApp)">Specific Date</option>
                  </select>

                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
                  >
                    <option value="Morning (9:00 AM – 1:00 PM)">Morning (9AM–1PM)</option>
                    <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1PM–5PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5PM–8PM)</option>
                  </select>
                </div>

                <textarea
                  placeholder="Additional order instructions or notes for the florist..."
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold text-stone-900">{subtotalDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({selectedZone.name})</span>
                <span className="font-mono font-semibold text-stone-900">
                  {selectedZone.feeUsd === 0 ? 'FREE' : `$${selectedZone.feeUsd}`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 text-sm font-bold text-stone-900">
                <span>Total Due</span>
                <span className="font-mono text-base">{totalDisplay}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Complete Order via WhatsApp</span>
            </button>

            <p className="text-[10px] text-center text-stone-500">
              Payment via Cash on Delivery, OMT, or Whish Money upon receipt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
