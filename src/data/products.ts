/** Central product model. These are deliberately fictional DEMO products/prices. */
export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  size: string;
  price: number;
  category: string;
  accent: string;
  description: string;
  notes: string[];
  enabled: boolean;
  image: string;
};

export const STARTER_PRODUCTS: Product[] = [
  {
    id: 'original', slug: 'golden-original', name: 'Golden Original', shortName: 'The Original',
    size: '250 g', price: 1450, category: 'Signature', accent: '#cc7b3f',
    description: 'A softly textured pumpkin-inspired spread for slow mornings and everyday rituals.',
    notes: ['Smooth texture', 'Breakfast pairing', 'Signature blend'], enabled: true,
    image: '/assets/pumpkin-original.svg',
  },
  {
    id: 'spiced', slug: 'warm-spice', name: 'Warm Spice', shortName: 'Warm Spice',
    size: '250 g', price: 1650, category: 'Seasonal', accent: '#a34e32',
    description: 'A warming, spice-inspired variation imagined for toast, bowls and desserts.',
    notes: ['Warm profile', 'Pantry favorite', 'Small-batch concept'], enabled: true,
    image: '/assets/pumpkin-spiced.svg',
  },
  {
    id: 'coconut', slug: 'coconut-glow', name: 'Coconut Glow', shortName: 'Coconut Glow',
    size: '250 g', price: 1750, category: 'Collection', accent: '#c3a577',
    description: 'A softly mellow pumpkin-and-coconut concept with an understated tropical character.',
    notes: ['Mellow profile', 'Spread or swirl', 'Collection concept'], enabled: true,
    image: '/assets/pumpkin-coconut.svg',
  },
  {
    id: 'roasted', slug: 'slow-roasted', name: 'Slow Roasted', shortName: 'Slow Roasted',
    size: '200 g', price: 1550, category: 'Collection', accent: '#7f4935',
    description: 'A deeper roasted-pumpkin direction designed as a richer pantry staple.',
    notes: ['Roasted profile', 'Rich texture', 'Serving inspiration'], enabled: true,
    image: '/assets/pumpkin-roasted.svg',
  },
];
