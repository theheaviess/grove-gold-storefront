'use client';
import { usePathname } from 'next/navigation';
import SiteFooter from './SiteFooter';
export default function FooterSwitch(){const path=usePathname();return path.startsWith('/admin')?null:<SiteFooter/>;}
