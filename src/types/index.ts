export interface FloralProduct {
  id: string;
  name: string;
  category: 'roses' | 'boxes' | 'events' | 'bouquets' | 'special';
  categoryLabel: string;
  price: number; // in USD
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  stemsCount?: string;
  flowerTypes: string[];
  dimensions?: string;
  includedItems?: string[];
  isFeatured?: boolean;
  bestFor: string[];
  sizes?: {
    name: string;
    stems: number;
    price: number;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  selectedSize?: string;
  selectedStems?: number;
  price: number;
  quantity: number;
  image: string;
  customCardMessage?: string;
  customCardRecipient?: string;
  customRibbonColor?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  area: string;
  feeUsd: number;
  estimatedTime: string;
}

export interface CustomBouquetConfig {
  flowerType: string;
  flowerName: string;
  stems: number;
  basePrice: number;
  packaging: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  cardMessage: string;
  cardRecipient: string;
  addOns: {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  }[];
  deliveryArea: string;
  specialInstructions?: string;
}
