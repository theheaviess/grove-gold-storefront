'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(localStorage.getItem('grove-cookie-note') !== 'dismissed'); }, []);
  if (!visible) return null;
  return <div className="cookie-banner" role="region" aria-label="Local storage notice"><div><strong>A note about this demo</strong><p>We save your demo cart and preferences in this browser only. No analytics, marketing cookies or payments are active. <Link href="/policies/cookies">Read the demo cookie notice</Link>.</p></div><button onClick={() => {localStorage.setItem('grove-cookie-note', 'dismissed'); setVisible(false);}} className="btn btn-dark small">Understood</button></div>;
}
