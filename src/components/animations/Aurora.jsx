'use client';
// Aurora: WebGL shader based on the OGL example supplied in the project brief.
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main(){gl_Position = vec4(position,0.,1.);}`;
const FRAG = `#version 300 es
precision highp float;
uniform float uTime; uniform float uAmplitude; uniform float uBlend;
uniform vec3 uColorStops[3]; uniform vec2 uResolution;
out vec4 fragColor;
vec3 permute(vec3 x){ return mod(((x*34.)+1.)*x,289.); }
float snoise(vec2 v){
 const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
 vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
 vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
 vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod(i,289.);
 vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
 vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
 m=m*m; m=m*m; vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5;
 vec3 ox=floor(x+.5); vec3 a0=x-ox;
 m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
 vec3 g; g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
 return 130.*dot(m,g);
}
void main(){
 vec2 uv=gl_FragCoord.xy/uResolution;
 vec3 ramp=uv.x<.5?mix(uColorStops[0],uColorStops[1],uv.x*2.):mix(uColorStops[1],uColorStops[2],(uv.x-.5)*2.);
 float h=exp(snoise(vec2(uv.x*2.+uTime*.1,uTime*.25))*.5*uAmplitude);
 float intensity=.6*(uv.y*2.-h+.2);
 float alpha=smoothstep(.2-uBlend*.5,.2+uBlend*.5,intensity);
 fragColor=vec4(intensity*ramp*alpha,alpha);
}`;

export default function Aurora({ colorStops = ['#7cff67','#B497CF','#5227FF'], blend = .5, amplitude = 1, speed = 1 }) {
 const holder=useRef(null);
 useEffect(() => {
   const element=holder.current;
   if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
   let renderer;
   try { renderer=new Renderer({alpha:true,premultipliedAlpha:true,antialias:true}); }
   catch { return; } // Site still renders on devices without WebGL 2.
   const gl=renderer.gl; gl.clearColor(0,0,0,0);
   const program=new Program(gl,{vertex:VERT,fragment:FRAG,uniforms:{
     uTime:{value:0},uAmplitude:{value:amplitude},uBlend:{value:blend},
     uColorStops:{value:colorStops.map(hex=>{const c=new Color(hex);return [c.r,c.g,c.b];})},
     uResolution:{value:[element.offsetWidth,element.offsetHeight]}
   }});
   const mesh=new Mesh(gl,{geometry:new Triangle(gl),program});
   element.appendChild(gl.canvas);
   const resize=()=>{renderer.setSize(element.offsetWidth,element.offsetHeight);program.uniforms.uResolution.value=[element.offsetWidth,element.offsetHeight];};
   const observer=new ResizeObserver(resize);observer.observe(element);resize();
   let raf=0;let visible=true;
   const view=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});view.observe(element);
   const animate=(now)=>{raf=requestAnimationFrame(animate);if(!visible||document.hidden)return;program.uniforms.uTime.value=now*.0001*speed;renderer.render({scene:mesh});};
   raf=requestAnimationFrame(animate);
   return ()=>{cancelAnimationFrame(raf);observer.disconnect();view.disconnect();gl.canvas.remove();gl.getExtension('WEBGL_lose_context')?.loseContext();};
 }, [amplitude,blend,speed,colorStops.join('|')]); // Values are fixed in the demo.
 return <div className="aurora-container" ref={holder} aria-hidden="true"/>;
}
