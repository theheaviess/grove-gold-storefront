'use client';
import { ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { formatLKR } from '@/lib/format';
import { useState } from 'react';
export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
 const { addToCart } = useShop();const [added,setAdded]=useState(false);
 const add=()=>{addToCart(product.id);setAdded(true);setTimeout(()=>setAdded(false),1400);};
 return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-picture" aria-label={`View ${product.name}`}><div className="product-num">0{index+1} / 04</div><img src={product.image} alt={`${product.name} illustrative jar packaging`}/><span className="product-picture-link"><ArrowUpRight size={19}/></span></Link><div className="product-card-meta"><div><span className="overline">{product.category.toUpperCase()} · {product.size}</span><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><span className="price">{formatLKR(product.price)}</span></div><button className="add-round" onClick={add} aria-label={`Add ${product.name} to bag`}>{added?'✓':<Plus size={21}/>}</button></div></article>;
}
