/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PizzaSize = 'Small' | 'Medium' | 'Large';

export interface CrustOption {
  id: string;
  name: string;
  price: number;
}

export interface SauceOption {
  id: string;
  name: string;
  price: number;
}

export interface Topping {
  id: string;
  name: string;
  category: 'cheese' | 'meat' | 'veg';
  price: number;
  icon?: string;
}

export interface PresetPizza {
  id: string;
  name: string;
  description: string;
  category: 'Classic' | 'Premium' | 'Vegan' | 'Vegetarian';
  basePrice: number;
  image: string;
  defaultSize: PizzaSize;
  defaultCrust: string;
  defaultSauce: string;
  defaultToppings: string[]; // Topping IDs
}

export interface CustomPizza {
  size: PizzaSize;
  crust: string; // Crust name or ID
  sauce: string; // Sauce name or ID
  toppings: string[]; // Topping IDs
  price: number;
}

export interface CartItem {
  cartId: string;
  isCustom: boolean;
  presetPizza?: PresetPizza;
  customPizza?: CustomPizza;
  quantity: number;
  price: number; // Unit price
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
  phone?: string;
}

export type OrderStatus = 'Pending' | 'In the Oven' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  userId?: string;
  customerDetails: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Pending';
  createdAt: string;
}
