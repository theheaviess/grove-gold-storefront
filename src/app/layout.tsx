import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Grove & Gold | Premium Storefront Concept by Heavies',
  description: 'An interactive, fictional pumpkin-spread e-commerce concept demonstrating storefront, products, 3D packaging, cart, checkout, and an admin preview.',
  robots: { index: false, follow: false }, // Preview: never index fictional prices or policies.
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><ShopProvider><SiteHeader/><main id="main-content">{children}</main><FooterSwitch/><CookieBanner/></ShopProvider></body></html>;
}

// Separating the footer makes sure admin screens can be presented on their own.
import FooterSwitch from '@/components/FooterSwitch';
