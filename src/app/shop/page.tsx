'use client';
import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';

export default function ShopPage() {
 const { products }=useShop();const [query,setQuery]=useState('');const [sort,setSort]=useState('featured');
 const listed=useMemo(()=>{
   const all=products.filter(product=>product.enabled && product.name.toLowerCase().includes(query.toLowerCase()));
   return [...all].sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:0);
 },[products,query,sort]);
 return <div className="shop-page"><section className="page-masthead"><span className="overline green">THE THOUGHTFUL PANTRY / 01</span><h1>The collection<span className="masthead-star">✳</span></h1><p>Something delightful for every everyday moment.</p></section><div className="shop-content"><div className="shop-toolbar"><p>{listed.length} PRODUCT CONCEPT{listed.length!==1?'S':''}</p><div className="shop-filters"><label className="sr-only" htmlFor="search-products">Search product concepts</label><input id="search-products" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection"/><SlidersHorizontal size={16}/><label className="sr-only" htmlFor="sort-products">Sort products</label><select id="sort-products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div><div className="products-grid shop-grid">{listed.map((product,index)=><ProductCard product={product} index={index} key={product.id}/>)}</div>{listed.length===0&&<p className="no-results">No matching concepts found.</p>}<p className="sample-disclaimer">Prices and product details in this prototype are placeholders, not a real product offer.</p></div></div>;
}
