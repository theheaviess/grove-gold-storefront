'use client';
// Compact adaptation of the supplied bell toggle for demo-only interest tracking.
import { useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import './BellToggle.css';
export default function BellToggle({offLabel='Remind me',onLabel='Reminder preview on',onChange=()=>{},size='md',disabled=false}) {
 const [pressed,setPressed]=useState(false);const [ringKey,setRingKey]=useState(0);
 const reduced=useReducedMotion();const btn=useRef(null);
 const toggle=()=>{
   const next=!pressed;setPressed(next);onChange(next);
   if(next&&!reduced)setRingKey(x=>x+1);
 };
 return <motion.button ref={btn} whileTap={reduced?undefined:{scale:.96}} type="button" className={`bell-toggle-btn ${pressed?'on':''} ${size}`} disabled={disabled} aria-pressed={pressed} onClick={toggle}>
   <span className="bell-toggle-icon"><motion.span key={ringKey} animate={ringKey&&!reduced?{rotate:[0,-20,15,-11,7,0]}:{rotate:0}} transition={{duration:.82,ease:'easeInOut'}}><Bell size={17} strokeWidth={1.7}/></motion.span>{pressed&&<i className="bell-activated"/>}</span>
   <span className="bell-toggle-label" key={String(pressed)}>{pressed?onLabel:offLabel}</span>
 </motion.button>;
}
