'use client';
// GSAP text-on-path marquee, inspired by the supplied React Bits TextLoop.
import { useEffect,useId,useMemo,useRef } from 'react';
import { gsap } from 'gsap';
import './TextLoop.css';
export default function TextLoop({ text='ROOTED IN THE GOOD STUFF',speed=75,separator='✳',color='#f5eddc',ribbonColor='#c16f42' }){
 const id=useId().replace(/:/g,'');const pathId=`textloop-${id}`;
 const first=useRef(null);const second=useRef(null);const root=useRef(null);
 const unit=useMemo(()=>`${text.toUpperCase()}  ${separator}  `.repeat(6),[text,separator]);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const state={offset:0};const tween=gsap.to(state,{offset:1200,duration:1200/speed,ease:'none',repeat:-1,onUpdate:()=>{
   first.current?.setAttribute('startOffset',`${state.offset}`);
   second.current?.setAttribute('startOffset',`${state.offset-1200}`);
  }});
  const el=root.current;const pause=()=>tween.pause();const resume=()=>tween.resume();
  el?.addEventListener('pointerenter',pause);el?.addEventListener('pointerleave',resume);
  return ()=>{tween.kill();el?.removeEventListener('pointerenter',pause);el?.removeEventListener('pointerleave',resume);};
 },[speed]);
 return <div ref={root} className="textloop" aria-label={text}><svg viewBox="0 0 1200 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><path id={pathId} d="M-200 122 Q0 27 200 122 T600 122 T1000 122 T1400 122"/></defs><use href={`#${pathId}`} fill="none" stroke={ribbonColor} strokeWidth="85" strokeLinecap="round"/><text fill={color} fontSize="36" fontFamily="Arial,sans-serif" fontWeight="700" letterSpacing="5"><textPath ref={first} href={`#${pathId}`} startOffset="0">{unit}</textPath><textPath ref={second} href={`#${pathId}`} startOffset="-1200">{unit}</textPath></text></svg></div>;
}
