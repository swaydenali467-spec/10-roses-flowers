import { SHOP_INFO } from '../data/floristData';
import { CartItem, CustomBouquetConfig } from '../types';

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${SHOP_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function buildQuickProductMessage(
  productName: string,
  price: number,
  sizeName?: string,
  recipientName?: string,
  cardMessage?: string
): string {
  let msg = `Hello 10Roses Flowers! 🌹\n\nI would like to order from your boutique in Haouch El Omaraa, Zahlé:\n`;
  msg += `• Item: ${productName}\n`;
  if (sizeName) {
    msg += `• Size: ${sizeName}\n`;
  }
  msg += `• Price: $${price} USD\n`;

  if (recipientName) {
    msg += `• Recipient: ${recipientName}\n`;
  }
  if (cardMessage) {
    msg += `• Card Message: "${cardMessage}"\n`;
  }

  msg += `\nPlease let me know your delivery availability in Zahlé. Thank you!`;
  return msg;
}

export function buildCustomBouquetMessage(config: CustomBouquetConfig, totalPrice: number): string {
  let msg = `Hello 10Roses Flowers! 🌹\n\nI just customized a bouquet on your website:\n`;
  msg += `• Flower Choice: ${config.flowerName}\n`;
  msg += `• Quantity: ${config.stems} Stems\n`;
  msg += `• Packaging: ${config.packaging.name}\n`;

  const selectedAddOns = config.addOns.filter((a) => a.selected);
  if (selectedAddOns.length > 0) {
    msg += `• Add-ons: ${selectedAddOns.map((a) => `${a.name} (+$${a.price})`).join(', ')}\n`;
  }

  if (config.cardRecipient) {
    msg += `• Recipient: ${config.cardRecipient}\n`;
  }
  if (config.cardMessage) {
    msg += `• Greeting Card Note: "${config.cardMessage}"\n`;
  }

  msg += `• Delivery Area: ${config.deliveryArea}\n`;
  if (config.specialInstructions) {
    msg += `• Special Notes: ${config.specialInstructions}\n`;
  }
  msg += `• Estimated Total: $${totalPrice} USD\n\n`;
  msg += `Could you please confirm if this can be prepared and delivered? Thanks!`;
  return msg;
}

export function buildCartCheckoutMessage(
  items: CartItem[],
  subtotal: number,
  deliveryFee: number,
  deliveryZoneName: string,
  customerName: string,
  customerPhone: string,
  recipientAddress: string,
  deliveryDate: string,
  deliveryTimeSlot: string,
  orderNotes?: string
): string {
  const total = subtotal + deliveryFee;
  let msg = `Hello 10Roses Flowers! 💐\n\nI'd like to place an order for delivery/pickup in Zahlé:\n\n`;

  msg += `*ORDER ITEMS:*\n`;
  items.forEach((item, index) => {
    msg += `${index + 1}. ${item.name} (${item.quantity}x) — $${item.price * item.quantity} USD\n`;
    if (item.selectedSize) {
      msg += `   - Option: ${item.selectedSize}\n`;
    }
    if (item.customCardRecipient) {
      msg += `   - For: ${item.customCardRecipient}\n`;
    }
    if (item.customCardMessage) {
      msg += `   - Card Message: "${item.customCardMessage}"\n`;
    }
  });

  msg += `\n*DELIVERY & RECIPIENT DETAILS:*\n`;
  msg += `• Customer Name: ${customerName}\n`;
  msg += `• Customer Contact: ${customerPhone}\n`;
  msg += `• Delivery Zone: ${deliveryZoneName}\n`;
  msg += `• Delivery Address: ${recipientAddress}\n`;
  msg += `• Desired Date: ${deliveryDate}\n`;
  msg += `• Desired Time Slot: ${deliveryTimeSlot}\n`;

  if (orderNotes) {
    msg += `• Notes: ${orderNotes}\n`;
  }

  msg += `\n*FINANCIAL SUMMARY:*\n`;
  msg += `• Subtotal: $${subtotal} USD\n`;
  msg += `• Delivery Fee: ${deliveryFee === 0 ? 'FREE (Local Pickup / Haouch El Omaraa)' : `$${deliveryFee} USD`}\n`;
  msg += `• Total Due: $${total} USD (Cash on Delivery or OMT/Whish accepted)\n\n`;
  msg += `Please confirm preparation. Thank you!`;

  return msg;
}
