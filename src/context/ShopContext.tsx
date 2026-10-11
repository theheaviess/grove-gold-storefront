'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STARTER_PRODUCTS, type Product } from '@/data/products';

export type CartLine = { productId: string; quantity: number };
type StoreContextValue = {
  products: Product[];
  cart: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (productId: string, qty?: number) => void;
  setCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  saveProduct: (product: Product) => void;
  setProductEnabled: (productId: string, enabled: boolean) => void;
  resetDemo: () => void;
};

const STORAGE_KEY = 'grove-gold-v1';
const ShopContext = createContext<StoreContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(STARTER_PRODUCTS);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Demo persistence only. No client or payment data is stored or sent to a server.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (Array.isArray(saved.products)) setProducts(saved.products);
      if (Array.isArray(saved.cart)) setCart(saved.cart);
    } catch { /* Corrupt demo storage should never crash the storefront. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, cart }));
  }, [products, cart, hydrated]);

  const addToCart = (productId: string, qty = 1) => {
    setCart(lines => {
      const already = lines.find(line => line.productId === productId);
      return already
        ? lines.map(line => line.productId === productId ? { ...line, quantity: Math.min(99, line.quantity + qty) } : line)
        : [...lines, { productId, quantity: qty }];
    });
  };
  const setCartQuantity = (productId: string, qty: number) =>
    setCart(lines => qty <= 0
      ? lines.filter(line => line.productId !== productId)
      : lines.map(line => line.productId === productId ? { ...line, quantity: Math.min(qty, 99) } : line));

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartSubtotal = cart.reduce((sum, line) =>
    sum + (products.find(product => product.id === line.productId)?.price || 0) * line.quantity, 0);

  const value = useMemo<StoreContextValue>(() => ({
    products, cart, cartCount, cartSubtotal, addToCart, setCartQuantity,
    clearCart: () => setCart([]),
    saveProduct: product => setProducts(all => {
      const exists = all.some(existing => existing.id === product.id);
      return exists ? all.map(existing => existing.id === product.id ? product : existing) : [...all, product];
    }),
    setProductEnabled: (productId, enabled) =>
      setProducts(all => all.map(item => item.id === productId ? { ...item, enabled } : item)),
    resetDemo: () => { setProducts(STARTER_PRODUCTS); setCart([]); },
  // Function identities don't need to be stable for this small prototype.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [products, cart, cartCount, cartSubtotal]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
