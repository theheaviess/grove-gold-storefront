'use client';

import { RotateCcw, MoveHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Product } from '@/data/products';

type Props = { product: Product; compact?: boolean };

/**
 * Interactive CSS 3D jar concept, NOT a photogrammetry scan of real packaging.
 * Drag or use the accessible slider to inspect the jar; update this component
 * with a real client's GLB model once product photography / dimensions exist.
 */
export default function Jar3D({ product, compact = false }: Props) {
  const [angle, setAngle] = useState(-18);
  const pointer = useRef<{ x: number; angle: number } | null>(null);
  const segments = Array.from({ length: 32 }, (_, i) => i);
  const start = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointer.current = { x: event.clientX, angle };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current) return;
    setAngle(pointer.current.angle + (event.clientX - pointer.current.x) * 0.7);
  };
  const end = () => { pointer.current = null; };

  return <div className={`jar-experience ${compact ? 'compact' : ''}`}>
    <div className="jar-stage" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <div className="jar-halo"/>
      <div className="jar-floor-shadow"/>
      <div className="jar-model" style={{ transform: `rotateX(-7deg) rotateY(${angle}deg)` }} aria-hidden="true">
        {segments.map(i => <div key={`glass-${i}`} className="jar-glass-segment" style={{ transform: `rotateY(${i*360/32}deg) translateZ(108px)`, backgroundColor: product.accent }}/>) }
        <div className="jar-body-top"/>
        <div className="jar-body-bottom"/>
        {segments.map(i => <div key={`lid-${i}`} className="jar-lid-segment" style={{ transform: `rotateY(${i*360/32}deg) translateZ(117px)` }}/>) }
        <div className="jar-lid-top"/>
        <div className="jar-main-label"><div className="jar-label-border"><div className="jar-brand">grove <i>&</i> gold</div><div className="jar-label-rule"/><div className="jar-label-title">{product.shortName}</div><div className="jar-label-type">PUMPKIN SPREAD</div><div className="jar-illustration">✳</div><div className="jar-label-foot">SMALL BATCH CONCEPT · {product.size}</div></div></div>
        <div className="jar-back"><div className="jar-brand">grove & gold</div><p>AN ILLUSTRATIVE<br/>PRODUCT CONCEPT</p><small>DESIGNED BY HEAVIES</small></div>
      </div>
    </div>
    {!compact && <div className="jar-controls"><span><MoveHorizontal size={15}/> DRAG TO ROTATE</span><label className="sr-only" htmlFor="jar-rotation">Rotate 3D product</label><input id="jar-rotation" aria-label="Rotate 3D product" type="range" min="-180" max="180" value={((angle+180)%360+360)%360-180} onChange={e=>setAngle(Number(e.target.value))}/><button onClick={()=>setAngle(-18)} title="Reset rotation" aria-label="Reset rotation"><RotateCcw size={15}/></button></div>}
  </div>;
}
