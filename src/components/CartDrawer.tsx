'use client';
import Link from 'next/link';
import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { formatLKR } from '@/lib/format';

type Props = { open: boolean; onClose: () => void };
export default function CartDrawer({ open, onClose }: Props) {
  const { cart, products, setCartQuantity, cartSubtotal } = useShop();
  useEffect(() => { if (open) {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  } }, [open, onClose]);

  return <div className={`cart-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
    <button className="cart-backdrop" aria-label="Close bag" tabIndex={open ? 0 : -1} onClick={onClose} />
    <aside className="cart-panel" role="dialog" aria-modal={open} aria-label="Your shopping bag" inert={!open}>
      <div className="cart-head"><div><span className="overline">YOUR SELECTION</span><h2>The good stuff.</h2></div><button className="icon-btn" aria-label="Close bag" onClick={onClose}><X size={21}/></button></div>
      {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={38} strokeWidth={1.2}/><h3>Nothing in the bag. Yet.</h3><p>Your next pantry favorite is waiting.</p><Link href="/shop" className="btn btn-dark" onClick={onClose}>Explore the collection <ArrowUpRight size={16}/></Link></div> : <>
        <div className="cart-lines">{cart.map(line => {
          const product = products.find(p => p.id === line.productId);
          if (!product) return null;
          return <article className="cart-line" key={product.id}><img src={product.image} alt=""/><div className="cart-line-info"><strong>{product.name}</strong><small>{product.size} · Demo product</small><span className="cart-line-price">{formatLKR(product.price * line.quantity)}</span><div className="qty-inline"><button onClick={() => setCartQuantity(product.id, line.quantity - 1)} aria-label={`Remove one ${product.name}`}><Minus size={14}/></button><span>{line.quantity}</span><button onClick={() => setCartQuantity(product.id, line.quantity + 1)} aria-label={`Add one ${product.name}`}><Plus size={14}/></button></div></div></article>;
        })}</div>
        <div className="cart-bottom"><div className="cart-total"><span>Subtotal</span><strong>{formatLKR(cartSubtotal)}</strong></div><p className="fine-print">Illustrative prices. Delivery is shown separately at checkout.</p><Link href="/checkout" onClick={onClose} className="btn btn-dark full">Review checkout <ArrowUpRight size={17}/></Link><small className="demo-hint">Frontend demo — no actual purchases.</small></div>
      </>}
    </aside>
  </div>;
}
