/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { PresetPizza, Topping, Order, OrderStatus } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database State
const users: any[] = [];
const orders: Order[] = [];

// Base Menu Presets
const MENU_PRESETS: PresetPizza[] = [
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
    defaultToppings: ['t_mozzarella']
  },
  {
    id: '2',
    name: 'Diavola Pepperoni & Jalapeño',
    description: 'Spicy Naples-style salami, peppered pepperoni, hot sliced jalapeños, shredded mozzarella, and our fiery marinara spice base.',
    category: 'Premium',
    basePrice: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Fiery Arrabbiata',
    defaultToppings: ['t_mozzarella', 't_pepperoni', 't_jalapenos']
  },
  {
    id: '3',
    name: 'Garden Vegan Harvest',
    description: 'House vegan almond milk cheese, roasted red bell peppers, wild artichoke hearts, cremini mushrooms, and tender organic baby spinach with a garlic cream base.',
    category: 'Vegan',
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
    description: 'Fragrant Genovese basil pesto, crumbles of soft goat cheese, roasted red onions, cremini mushrooms, and wild wild rockets.',
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
    category: 'Premium',
    basePrice: 16.99,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'White Garlic Cream',
    defaultToppings: ['t_mozzarella', 't_mushrooms', 't_onions', 't_parmigiano']
  },
  {
    id: '6',
    name: 'The Napoli Marinara',
    description: 'An ancient dairy-free traditional masterpiece. Simple crushed Italian plum tomatoes, sliced mountain garlic, dry oregano, and hand-torn sweet basil.',
    category: 'Vegan',
    basePrice: 10.99,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: ['t_olives', 't_spinach']
  },
  {
    id: '7',
    name: 'Quattro Formaggi Bianca',
    description: 'A luxurious white blend of premium buffalo mozzarella, sharp gorgonzola blue cheese, creamy goat cheese, and shaved parmigiano-reggiano, finished with a subtle hint of wildflower organic honey.',
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
    category: 'Classic',
    basePrice: 15.49,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500',
    defaultSize: 'Medium',
    defaultCrust: 'Artisanal Neapolitan',
    defaultSauce: 'Rustic Marinara',
    defaultToppings: ['t_mozzarella', 't_sausage', 't_bell_peppers', 't_onions']
  }
];

// Available Toppings Definition
const TOPPINGS_CATALOG: Topping[] = [
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

// Helper: Custom base64-based JWT Signature mock to avoid native module compilation issues
// Format: header_b64.payload_b64.signature_string
function signToken(payload: { id: string; email: string; name: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = 'sec_pizzaiolo_' + header.slice(-5) + body.slice(-5);
  return `${header}.${body}.${signature}`;
}

function verifyToken(token: string): { id: string; email: string; name: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const bodyStr = Buffer.from(parts[1], 'base64url').toString();
    return JSON.parse(bodyStr);
  } catch {
    return null;
  }
}

// REST Middlewares
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  const userPayload = verifyToken(token);
  if (!userPayload) return res.status(403).json({ error: 'Invalid or expired token' });
  
  req.user = userPayload;
  next();
};

// ---------------- REST API Endpoints ----------------

// Get Menu Items
app.get('/api/menu', (req, res) => {
  res.json(MENU_PRESETS);
});

// Get Toppings Catalog
app.get('/api/toppings', (req, res) => {
  res.json(TOPPINGS_CATALOG);
});

// Authentication: Register
app.post('/api/auth/register', (req: any, res: any) => {
  const { email, password, name, address, phone } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email is already registered' });
  }

  const newUser = {
    id: 'user_' + Date.now(),
    email: email.toLowerCase(),
    password, // In a real system, you would hash this with bcrypt
    name,
    address: address || '',
    phone: phone || ''
  };

  users.push(newUser);
  const token = signToken({ id: newUser.id, email: newUser.email, name: newUser.name });
  
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      address: newUser.address,
      phone: newUser.phone
    }
  });
});

// Authentication: Login
app.post('/api/auth/login', (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password combination' });
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone
    }
  });
});

// Check current profile
app.get('/api/auth/me', authenticateToken, (req: any, res: any) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User profiles not found' });
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone
  });
});

// Submit a new order (Supports Authenticated users and Guest checkout)
app.post('/api/orders', (req: any, res: any) => {
  const { userId, customerDetails, items, subtotal, tax, deliveryFee, total, paymentToken } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cannot place an empty order' });
  }
  if (!customerDetails || !customerDetails.name || !customerDetails.address || !customerDetails.phone) {
    return res.status(400).json({ error: 'Customer details (name, delivery address, phone) are strictly required' });
  }

  // Stripe Mock validation
  if (!paymentToken) {
    return res.status(400).json({ error: 'Stripe Mock processing failed: Payment token is required' });
  }

  const newOrder: Order = {
    id: 'ord_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    userId: userId || undefined,
    customerDetails,
    items,
    subtotal,
    tax,
    deliveryFee,
    total,
    status: 'Pending',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);

  // Background state simulator: Increment status representation over time
  // This simulates the actual pizzaiolo kitchen experience!
  setTimeout(() => {
    const o = orders.find(x => x.id === newOrder.id);
    if (o) o.status = 'In the Oven';
  }, 12000); // 12 seconds to "In the oven"

  setTimeout(() => {
    const o = orders.find(x => x.id === newOrder.id);
    if (o) o.status = 'Out for Delivery';
  }, 28000); // 28 seconds to "Out for delivery"

  setTimeout(() => {
    const o = orders.find(x => x.id === newOrder.id);
    if (o) o.status = 'Delivered';
  }, 44000); // 44 seconds to "Delivered"

  res.status(201).json({
    message: 'Order created and paid successfully',
    order: newOrder
  });
});

// Get order history (Retrieves user orders or user guest orders using email matching)
app.get('/api/orders', (req: any, res: any) => {
  const userId = req.query.userId;
  const email = req.query.email;

  if (!userId && !email) {
    return res.json([]);
  }

  let filtered = orders;
  if (userId) {
    filtered = filtered.filter(o => o.userId === userId);
  } else if (email) {
    filtered = filtered.filter(o => o.customerDetails.email.toLowerCase() === email.toLowerCase());
  }

  // Sorted by most recent order
  res.json(filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
});

// Manual status advancer for active interactive testing of order dashboard
app.post('/api/orders/:id/simulate', (req: any, res: any) => {
  const orderId = req.params.id;
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const statusWorkflow: OrderStatus[] = ['Pending', 'In the Oven', 'Out for Delivery', 'Delivered'];
  const currentIndex = statusWorkflow.indexOf(order.status);
  
  if (currentIndex < statusWorkflow.length - 1) {
    order.status = statusWorkflow[currentIndex + 1];
  } else {
    order.status = 'Pending'; // Wrap around for repeated validation
  }

  res.json({ message: `Status updated to ${order.status}`, order });
});

// ---------------- Dev & Asset Router Middleware ----------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pizzaiolo Express Fullstack platform running on port ${PORT}`);
  });
}

startServer();
