'use client';
import Link from 'next/link';
import { ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import CartDrawer from './CartDrawer';

export default function SiteHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useShop();
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  const nav = [{ href: '/shop', text: 'The Collection' }, { href: '/#story', text: 'Our Story' }, { href: '/#ritual', text: 'The Ritual' }];
  return <>
    <div className="announcement">A CONCEPT STORE BY HEAVIES <span>✳</span> A PREVIEW OF WHAT'S POSSIBLE</div>
    <header className="site-header"><div className="nav-inner">
      <Link href="/" className="brandmark" aria-label="Grove and Gold, homepage"><span className="brandmark-ornament">✳</span><span>grove <i>&</i> gold<span className="brandmark-sub">THE THOUGHTFUL PANTRY</span></span></Link>
      <nav className={`nav-links ${menuOpen ? 'show' : ''}`} aria-label="Main navigation">{nav.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={pathname === link.href ? 'active' : ''}>{link.text}</Link>)}<Link className="mobile-only" href="/admin/login" onClick={() => setMenuOpen(false)}>Admin preview</Link></nav>
      <div className="nav-actions"><Link href="/shop" className="nav-shop">Shop the collection <ArrowUpRight size={15}/></Link><button className="bag-btn" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}><ShoppingBag size={20} strokeWidth={1.5}/><span className="bag-count">{cartCount}</span></button><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </div></header>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
  </>;
}
