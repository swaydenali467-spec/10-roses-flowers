import { FloralProduct, DeliveryZone } from '../types';
import heroImg from '../assets/images/hero_rose_bouquet_1790589615105.jpg';
import classicRedRosesImg from '../assets/images/product_classic_red_roses_1790589627513.jpg';
import signatureBoxImg from '../assets/images/product_signature_flower_box_1790589637905.jpg';
import eventFloralsImg from '../assets/images/product_custom_event_florals_1790589648744.jpg';
import springPastelImg from '../assets/images/product_spring_pastel_bouquet_1790589659605.jpg';

export const SHOP_INFO = {
  name: '10Roses Flowers',
  city: 'Zahlé',
  tagline: 'Fresh Floral Arrangements & Bouquets in Zahlé',
  location: 'Haouch El Omaraa, Zahlé, Bekaa, Lebanon',
  landmark: 'Near Haouch El Omaraa Main Square, Zahlé',
  openingHoursDisplay: '8:00 AM – 8:00 PM (Daily)',
  openingHour: 8,
  closingHour: 20,
  phoneDisplay: '+961 76 184 953',
  phoneRaw: '+96176184953',
  whatsappRaw: '96176184953',
  heroImage: heroImg,
  usdToLbpRate: 89500, // Reference rate for optional LBP display
};

export const FLORAL_PRODUCTS: FloralProduct[] = [
  {
    id: 'classic-red-roses',
    name: 'Classic Red Rose Bouquet',
    category: 'roses',
    categoryLabel: 'Signature Roses',
    price: 35,
    originalPrice: 42,
    description: 'Timeless red roses prepared with fresh greens and premium wrapping.',
    longDescription:
      'Our iconic signature bouquet crafted from hand-selected Ecuadorian long-stem scarlet roses. Accented with Italian ruscus and fragrant eucalyptus, wrapped in matte blush-burgundy craft paper and finished with a double satin ribbon. A quintessential statement of affection and elegance.',
    image: classicRedRosesImg,
    stemsCount: '12 – 50 Premium Stems',
    flowerTypes: ['Ecuadorian Red Roses', 'Silver Dollar Eucalyptus', 'Italian Ruscus', 'Waxflower'],
    dimensions: 'Height 55cm · Diameter 38cm',
    includedItems: ['Complimentary handwritten card', 'Florist flower food sachet', 'Water hydration vial pack'],
    isFeatured: true,
    bestFor: ['Romance', 'Anniversary', "Valentine's Day", 'Proposals', 'Birthday'],
    sizes: [
      { name: 'Classic (12 Roses)', stems: 12, price: 35 },
      { name: 'Deluxe (24 Roses)', stems: 24, price: 65 },
      { name: 'Grand Sovereign (50 Roses)', stems: 50, price: 120 },
    ],
  },
  {
    id: 'signature-flower-box',
    name: 'Signature Flower Box',
    category: 'boxes',
    categoryLabel: 'Luxury Boxes',
    price: 48,
    originalPrice: 55,
    description: 'A vibrant selection of seasonal flowers arranged in a luxury gift box.',
    longDescription:
      'Artisanal cylindrical hatbox arrangement arranged with soft garden blush roses, white Dutch hydrangeas, lilac lisianthus, and cascading greenery. Built on floral oasis sponge for sustained freshness without requiring a vase.',
    image: signatureBoxImg,
    stemsCount: '22 Selected Blooms',
    flowerTypes: ['Blush Garden Roses', 'Dutch Hydrangeas', 'Lisianthus', 'Ranunculus', 'Eucalyptus'],
    dimensions: 'Box Diameter 22cm · Total Height 30cm',
    includedItems: ['Luxury round gift box with golden foil seal', 'Personalized greeting card', 'Hydration sponge'],
    isFeatured: true,
    bestFor: ['Birthdays', 'New Baby', 'Graduation', 'Thank You', 'Get Well'],
    sizes: [
      { name: 'Medium Hatbox', stems: 18, price: 48 },
      { name: 'Large Prestige Hatbox', stems: 30, price: 78 },
    ],
  },
  {
    id: 'custom-event-florals',
    name: 'Custom Event Florals',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    price: 95,
    description: 'Tailored arrangements for weddings, birthdays, and special occasions.',
    longDescription:
      'Bespoke venue and event floral centerpieces designed to harmonize with your celebration aesthetic in Zahlé and across the Bekaa. Featuring cascading white avalanche roses, delicate phalaenopsis orchids, and Mediterranean olive foliage in custom pedestals or elevated urns.',
    image: eventFloralsImg,
    stemsCount: 'Customizable Composition',
    flowerTypes: ['Avalanche White Roses', 'Phalaenopsis Orchids', 'White Snapdragons', 'Olive Leaves'],
    dimensions: 'Tailored to table or hall layout',
    includedItems: ['Venue consultation', 'Setup in Zahlé & Bekaa', 'Rental pedestal / vase available'],
    isFeatured: true,
    bestFor: ['Weddings', 'Engagement Parties', 'Gala Dinners', 'Private Receptions', 'Corporate Events'],
    sizes: [
      { name: 'Intimate Table Centerpiece', stems: 20, price: 95 },
      { name: 'Grand Entrance & Stage Arrangement', stems: 50, price: 190 },
      { name: 'Full Event Bespoke Package', stems: 150, price: 450 },
    ],
  },
  {
    id: 'spring-pastel-symphony',
    name: 'Spring Pastel Symphony',
    category: 'bouquets',
    categoryLabel: 'Seasonal Bouquets',
    price: 40,
    originalPrice: 48,
    description: 'Delicate garden roses, ranunculus, and baby’s breath in artisanal kraft paper.',
    longDescription:
      'A poetic breath of spring featuring peach and blush garden spray roses, buttercup ranunculus, fluffy gypsophila, and silver dollar eucalyptus. Tied with silk chiffon ribbon for a natural, meadow-gathered silhouette.',
    image: springPastelImg,
    stemsCount: '18 Garden Blooms',
    flowerTypes: ['Peach Spray Roses', 'Blush Ranunculus', 'Gypsophila (Baby’s Breath)', 'Eucalyptus'],
    dimensions: 'Height 45cm · Diameter 32cm',
    includedItems: ['Complimentary floral card', 'Flower food package'],
    isFeatured: true,
    bestFor: ['Spring Celebrations', 'Mother’s Day', 'Just Because', 'Friendship'],
    sizes: [
      { name: 'Standard Bouquet', stems: 18, price: 40 },
      { name: 'Lush Garden Bouquet', stems: 32, price: 70 },
    ],
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'haouch-omaraa',
    name: 'Haouch El Omaraa (Local)',
    area: 'Within 2 km of 10Roses Boutique',
    feeUsd: 0,
    estimatedTime: '30 – 60 min',
  },
  {
    id: 'zahle-boulevard',
    name: 'Zahlé Boulevard & Berdawny',
    area: 'Downtown, Berdawny Cafes, Midan',
    feeUsd: 2,
    estimatedTime: '45 – 75 min',
  },
  {
    id: 'maallaqa-karak',
    name: 'Maallaqa, Karak & Hosh El Zaraaneh',
    area: 'Eastern & North-East Zahlé',
    feeUsd: 2,
    estimatedTime: '45 – 90 min',
  },
  {
    id: 'ksara-qaaelrim',
    name: 'Ksara, Qaa El Rim & Hazerta',
    area: 'Upper Zahlé & Hills',
    feeUsd: 3,
    estimatedTime: '60 – 90 min',
  },
  {
    id: 'chtaura-jdita',
    name: 'Chtaura, Jdita & Saadnayel',
    area: 'Central Bekaa Corridor',
    feeUsd: 4,
    estimatedTime: '60 – 120 min',
  },
  {
    id: 'rayak-bekaa',
    name: 'Rayak, Zahle Outskirts & Bekaa',
    area: 'Extended Bekaa Valley delivery',
    feeUsd: 5,
    estimatedTime: 'Scheduled time slot',
  },
];

export const FLOWER_CARE_TIPS = [
  {
    step: '01',
    title: 'Fresh Water Replenishment',
    description: 'Empty and rinse your vase every 48 hours. Fill with clean, cold tap water and dissolve the flower nutrient pack.',
  },
  {
    step: '02',
    title: '45° Stem Trimming',
    description: 'Cut 1-2 cm off the base of each stem at a 45-degree angle under running water using sharp floral shears, not scissors.',
  },
  {
    step: '03',
    title: 'Cool & Sheltered Placement',
    description: 'Keep your bouquet away from direct midday sunlight, radiators, air conditioners, and ripening fruit bowls that emit ethylene gas.',
  },
  {
    step: '04',
    title: 'Pruning Submerged Leaves',
    description: 'Ensure no green foliage falls below the water line to prevent bacterial clouding and keep the water crystalline.',
  },
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Nour El Hajj',
    location: 'Haouch El Omaraa, Zahlé',
    date: '3 days ago',
    rating: 5,
    comment:
      'The Classic Red Rose Bouquet I ordered for our anniversary was breathtaking! The roses were remarkably fresh, velvety, and lasted over 11 days. The WhatsApp ordering process was so seamless.',
    item: 'Classic Red Rose Bouquet',
  },
  {
    id: 'rev-2',
    name: 'Karim Maalouf',
    location: 'Montreal, Canada (Delivered to Zahlé)',
    date: 'Last week',
    rating: 5,
    comment:
      'Living in Canada, I wanted to surprise my mother in Zahlé for her birthday. 10Roses arranged the Signature Flower Box and delivered it right to her doorstep in Berdawny with my card message. Truly exceptional service.',
    item: 'Signature Flower Box',
  },
  {
    id: 'rev-3',
    name: 'Christelle Skaff',
    location: 'Ksara, Zahlé',
    date: '2 weeks ago',
    rating: 5,
    comment:
      'We booked 10Roses for our engagement dinner centerpieces. Their eye for detail and the quality of their white roses and orchids made our venue look like a dream. Proud to have such florists in Zahlé!',
    item: 'Custom Event Florals',
  },
];
