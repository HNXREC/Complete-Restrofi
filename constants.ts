

import { MenuItem, RestaurantProfile } from './types';

export const RESTAURANTS: RestaurantProfile[] = [
  {
    id: 'restrofi-delhi',
    name: 'Restrofi',
    location: 'New Delhi, India',
    type: 'Fine Dining',
    phone: '+91 11 2345 6789'
  },
  {
    id: 'luna-mumbai',
    name: 'Luna',
    location: 'Mumbai, India',
    type: 'Modern European',
    phone: '+91 22 9876 5432'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- RESTROFI MENU ---
  {
    id: '1',
    restaurantId: 'restrofi-delhi',
    name: 'Zaffrani Paneer Tikka',
    description: 'Fresh cottage cheese marinated in saffron, yellow chili, and hung curd, smoked in a tandoor.',
    price: 850,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2517&auto=format&fit=crop',
    isPopular: true,
    dietary: ['GF', 'V', 'JAIN'],
    inStock: true
  },
  {
    id: '2',
    restaurantId: 'restrofi-delhi',
    name: 'Avocado Galouti',
    description: 'Melt-in-mouth kebabs made from hass avocado and aromatic spices, served on a saffron paratha.',
    price: 950,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670&auto=format&fit=crop',
    dietary: ['V'],
    inStock: true
  },
  {
    id: '3',
    restaurantId: 'restrofi-delhi',
    name: 'Truffle Mushroom Kulcha',
    description: 'Tandoor-baked flatbread stuffed with wild mushrooms and truffle oil, served with black garlic raita.',
    price: 650,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=2670&auto=format&fit=crop',
    dietary: ['V'],
    inStock: true
  },
  {
    id: '4',
    restaurantId: 'restrofi-delhi',
    name: 'Royal Kathal Biryani',
    description: 'Tender jackfruit dumplings dum-cooked with aged basmati rice, rose water, and caramelized onions.',
    price: 1100,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2000&auto=format&fit=crop',
    isPopular: true,
    dietary: ['VG', 'GF'],
    inStock: true
  },
  {
    id: '5',
    restaurantId: 'restrofi-delhi',
    name: 'Smoked Dal Bukhara',
    description: 'Black lentils slow-cooked for 24 hours over charcoal, finished with white butter and cream.',
    price: 900,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop',
    isPopular: true,
    dietary: ['GF', 'JAIN'],
    inStock: true
  },
  {
    id: '6',
    restaurantId: 'restrofi-delhi',
    name: 'Malai Kofta Reserve',
    description: 'Delicate dumplings of cashew and khoya simmered in a rich, silken white gravy with silver leaf.',
    price: 950,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2670&auto=format&fit=crop',
    dietary: ['GF', 'JAIN'],
    inStock: true
  },
  {
    id: '7',
    restaurantId: 'restrofi-delhi',
    name: 'Gold Leaf Gulab Jamun',
    description: 'Classic khoya dumplings steeped in rose syrup, garnished with edible 24k gold and pistachios.',
    price: 550,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1631520196235-08e5c8e79ce6?q=80&w=2680&auto=format&fit=crop',
    isPopular: true,
    dietary: ['V', 'JAIN'],
    inStock: true
  },
  {
    id: '8',
    restaurantId: 'restrofi-delhi',
    name: 'Saffron Pistachio Kulfi',
    description: 'Traditional Indian ice cream infused with Kashmiri saffron and roasted nuts.',
    price: 450,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?q=80&w=2670&auto=format&fit=crop',
    dietary: ['GF', 'JAIN'],
    inStock: true
  },
  {
    id: '9',
    restaurantId: 'restrofi-delhi',
    name: 'Masala Chai Martini',
    description: 'Vodka infused with Assam tea and whole spices, served chilled with a cinnamon stick.',
    price: 850,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2564&auto=format&fit=crop',
    isPopular: true,
    inStock: true
  },
  {
    id: '10',
    restaurantId: 'restrofi-delhi',
    name: 'Rose Thandai Elixir',
    description: 'A cooling blend of almonds, fennel, rose petals, and milk, served in a clay pot.',
    price: 400,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2574&auto=format&fit=crop',
    dietary: ['V', 'GF', 'JAIN'],
    inStock: true
  },

  // --- LUNA MENU ---
  {
    id: '11',
    restaurantId: 'luna-mumbai',
    name: 'Truffle Cacio e Pepe',
    description: 'Hand-rolled tonnarelli pasta with pecorino romano, black pepper, and shaved fresh truffle.',
    price: 1200,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=2670&auto=format&fit=crop',
    isPopular: true,
    dietary: ['V'],
    inStock: true
  },
  {
    id: '12',
    restaurantId: 'luna-mumbai',
    name: 'Burrata & Heirloom Tomato',
    description: 'Fresh burrata cheese with basil pesto, pine nuts, and balsamic glaze.',
    price: 950,
    category: 'starter',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2592&auto=format&fit=crop',
    dietary: ['GF', 'V'],
    inStock: true
  }
];