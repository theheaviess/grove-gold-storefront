'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Minus, Plus, RotateCw, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Jar3D from '@/components/Jar3D';
import { useShop } from '@/context/ShopContext';
import { formatLKR } from '@/lib/format';

export default function ProductPage() {
 const params=useParams();const {products,addToCart}=useShop();const product=products.find(item=>item.slug===params.slug&&item.enabled);
 const [qty,setQty]=useState(1);const [message,setMessage]=useState('');
 if(!product)return <section className="missing-page"><h1>We can't find that jar.</h1><Link className="btn btn-dark" href="/shop">Back to collection</Link></section>;
 const add=()=>{addToCart(product.id,qty);setMessage(`${qty} jar${qty>1?'s':''} added to your bag.`);};
 return <div className="detail-page"><div className="breadcrumb"><Link href="/shop"><ArrowLeft size={15}/> THE COLLECTION</Link><span>/</span><span>{product.name.toUpperCase()}</span></div><div className="detail-grid"><div className="detail-view"><span className="detail-top-label">A CLOSER LOOK — 360° CSS MODEL</span><Jar3D product={product}/><span className="detail-bottom-label">CONCEPT ARTWORK · NOT ACTUAL PRODUCT PHOTOGRAPHY</span></div><div className="detail-info"><span className="overline green">{product.category.toUpperCase()} / {product.size}</span><h1>{product.name}</h1><div className="detail-price">{formatLKR(product.price)} <small>DEMO PRICE</small></div><div className="detail-rule"/><p className="detail-description">{product.description}</p><ul className="detail-notes">{product.notes.map(note=><li key={note}><span>✳</span>{note}</li>)}</ul><div className="detail-rule"/><span className="detail-control-label">QUANTITY</span><div className="detail-purchase"><div className="quantity-picker"><button aria-label="Reduce quantity" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={17}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(q=>Math.min(20,q+1))}><Plus size={17}/></button></div><button className="btn btn-dark detail-add" onClick={add}><ShoppingBag size={17}/> Add to bag <ArrowRight size={17}/></button></div><div role="status" className="detail-status">{message}</div><p className="fine-print">Product details, ingredients, prices, delivery and availability require the client's approval before launch.</p></div></div><div className="detail-more"><Link href="/shop"><ArrowLeft size={15}/> Discover the rest of the collection</Link><span>TAKE TIME FOR THE GOOD THINGS ✳</span></div></div>;
}
