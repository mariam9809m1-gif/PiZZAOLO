/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresetPizza, Topping } from './types';

export const STATIC_MENU_PRESETS: PresetPizza[] = [
  {
    id: '1',
    name: 'Margherita Bella Classica',
    description: 'Fresh crushed Pomodoro tomatoes, premium buffalo mozzarella, aromatic fresh sweet basil leaves, and a generous drizzle of organic extra virgin olive oil.',
    category: 'Classic',
    basePrice: 11.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: ['t_mozzarella'],
    isPopular: true
  },
  {
    id: '2',
    name: 'Diavola Pepperoni & Jalapeño',
    description: 'Spicy Naples-style salami, peppered pepperoni, hot sliced jalapeños, shredded mozzarella, and our fiery marinara spice base.',
    category: 'Specialty',
    basePrice: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Fiery Arrabbiata',
    defaultToppings: ['t_mozzarella', 't_pepperoni', 't_jalapenos'],
    isPopular: true
  },
  {
    id: '3',
    name: 'Garden Vegan Harvest',
    description: 'House vegan almond milk cheese, roasted red bell peppers, wild artichoke hearts, cremini mushrooms, and tender organic baby spinach with a garlic cream base.',
    category: 'Vegetarian',
    basePrice: 13.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Alternative Gluten-Free',
    defaultSauce: 'White Garlic Cream',
    defaultToppings: ['t_vegan_cheese', 't_bell_peppers', 't_spinach', 't_mushrooms']
  },
  {
    id: '4',
    name: 'Tuscan Goat Cheese & Pesto',
    description: 'Fragrant Genovese basil pesto, crumbles of soft goat cheese, roasted red onions, cremini mushrooms, and wild rockets.',
    category: 'Vegetarian',
    basePrice: 15.99,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Genovese Basil Pesto',
    defaultToppings: ['t_mozzarella', 't_mushrooms', 't_onions']
  },
  {
    id: '5',
    name: 'The Truffle Mushroom',
    description: 'Earthy white truffle oil essence base, roasted forest mushrooms, wild caramelized red onions, fresh parmigiano shaved blocks, and thyme.',
    category: 'Specialty',
    basePrice: 16.99,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'White Garlic Cream',
    defaultToppings: ['t_mozzarella', 't_mushrooms', 't_onions', 't_parmigiano'],
    isPopular: true
  },
  {
    id: '6',
    name: 'The Napoli Marinara',
    description: 'An ancient dairy-free traditional masterpiece. Simple crushed Italian plum tomatoes, sliced mountain garlic, dry oregano, and hand-torn sweet basil.',
    category: 'Classic',
    basePrice: 10.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: ['t_olives', 't_spinach']
  },
  {
    id: '7',
    name: 'Quattro Formaggi Bianca',
    description: 'A luxurious white blend of premium buffalo mozzarella, sharp gorgonzola blue cheese, creamy goat cheese, and shaved parmigiano-reggiano, finished with wildflower honey.',
    category: 'Vegetarian',
    basePrice: 14.99,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'White Garlic Cream',
    defaultToppings: ['t_mozzarella', 't_gorgonzola', 't_parmigiano']
  },
  {
    id: '8',
    name: 'Salsiccia Calabrese Pepper',
    description: 'Sautéed sweet fennel Italian sausage crumbles, fire-roasted red bell peppers, caramelized sweet red onions, kalamata olives, and fresh hand-shaved Parmigiano-Reggiano.',
    category: 'Specialty',
    basePrice: 15.49,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: ['t_mozzarella', 't_sausage', 't_bell_peppers', 't_onions'],
    isPopular: true
  },
  // Sides
  {
    id: 'side_1',
    name: 'Woodfired Garlic Dough Balls',
    description: 'Puffy Neapolitan dough bites baked in our 485°C oven, brushed with garlic herb butter and served with warm marinara dipping sauce.',
    category: 'Sides',
    basePrice: 6.99,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: []
  },
  {
    id: 'side_2',
    name: 'Truffle Parmigiano Fries',
    description: 'Crispy golden fries tossed in aromatic white truffle oil, hand-shaved Parmigiano-Reggiano, and chopped fresh parsley.',
    category: 'Sides',
    basePrice: 7.49,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: [],
    isPopular: true
  },
  {
    id: 'side_3',
    name: 'Bufala Caprese Salad',
    description: 'Heirloom vine tomatoes, imported Campania DOP buffalo mozzarella, fresh basil leaves, balsamic reduction glaze, and flaky sea salt.',
    category: 'Sides',
    basePrice: 9.99,
    image: 'https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: []
  },
  // Drinks
  {
    id: 'drink_1',
    name: 'San Pellegrino Aranciata Rossa',
    description: 'Sparkling blood orange Italian fruit beverage made with Mediterranean oranges (330ml can).',
    category: 'Drinks',
    basePrice: 3.50,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: []
  },
  {
    id: 'drink_2',
    name: 'Peroni Nastro Azzurro',
    description: 'Crisp, refreshing premium Italian lager brewed in Rome with proprietary Nostrano dell’Isola maize (330ml bottle).',
    category: 'Drinks',
    basePrice: 6.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: [],
    isPopular: true
  },
  {
    id: 'drink_3',
    name: 'House Chianti Classico DOCG',
    description: 'Medium-bodied Tuscan red wine with notes of ripe cherry, earth, and subtle oak spice. Perfect pizza pairing (Glass).',
    category: 'Drinks',
    basePrice: 9.50,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Classic Thin',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: []
  }
];

export const STATIC_TOPPINGS: Topping[] = [
  // Cheeses
  { id: 't_mozzarella', name: 'Premium Mozzarella', category: 'cheese', price: 1.00 },
  { id: 't_gorgonzola', name: 'Gorgonzola Blue', category: 'cheese', price: 1.50 },
  { id: 't_vegan_cheese', name: 'Vegan Artisanal Cheese', category: 'cheese', price: 1.50 },
  { id: 't_parmigiano', name: 'Shaved Parmigiano-Reggiano', category: 'cheese', price: 1.00 },
  
  // Meats
  { id: 't_pepperoni', name: 'Spicy Pepperoni', category: 'meat', price: 1.75 },
  { id: 't_sausage', name: 'Fennel Italian Sausage', category: 'meat', price: 2.00 },
  { id: 't_bacon', name: 'Crisp Smoked Bacon', category: 'meat', price: 2.00 },
  { id: 't_chicken', name: 'Herb Grilled Chicken', category: 'meat', price: 2.00 },
  
  // Veggies
  { id: 't_mushrooms', name: 'Cremini Mushrooms', category: 'veg', price: 0.75 },
  { id: 't_bell_peppers', name: 'Flambé Bell Peppers', category: 'veg', price: 0.75 },
  { id: 't_onions', name: 'Caramelized Red Onions', category: 'veg', price: 0.50 },
  { id: 't_olives', name: 'Salty Kalamata Olives', category: 'veg', price: 0.75 },
  { id: 't_spinach', name: 'Organic Spinach', category: 'veg', price: 0.75 },
  { id: 't_jalapenos', name: 'Hot Sliced Jalapeños', category: 'veg', price: 0.50 },
  { id: 't_artichokes', name: 'Heirloom Artichoke Hearts', category: 'veg', price: 1.25 }
];
