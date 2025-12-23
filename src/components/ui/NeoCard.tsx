import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'diamond' | 'circle' | 'cross';
  life: number;
}
interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export function NeoCard({ children, className, animate = false }: NeoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseY, (val) => isMobile ? 0 : val * -15);
  const rotateY = useTransform(mouseX, (val) => isMobile ? 0 : val * 15);
  const shadowX = useTransform(mouseX, (val) => isMobile ? 4 : 4 + (val * -6));
  const shadowY = useTransform(mouseY, (val) => isMobile ? 4 : 4 + (val * -6));
  const dynamicShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) => `${sx}px ${sy}px 0px 0px #000000`
  );
  useEffect(() => {
    if (isMobile || !animate || !isHovered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Particle[] = [];
    let animationFrame: number;
    const colors = ['#A0522D', '#A3E635', '#000000'];
    const shapes: ('diamond' | 'circle' | 'cross')[] = ['diamond', 'circle', 'cross'];
    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        life: 1.0
      });
    };
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (p.shape === 'circle') {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else if (p.shape === 'diamond') {
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.lineTo(p.x - p.size, p.y);
          ctx.closePath();
        } else {
          ctx.moveTo(p.x - p.size, p.y);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x, p.y + p.size);
        }
        ctx.fill();
        ctx.stroke();
      });
      animationFrame = requestAnimationFrame(animateParticles);
    };
    const resize = () => {
      if (cardRef.current && canvas) {
        canvas.width = cardRef.current.clientWidth;
        canvas.height = cardRef.current.clientHeight;
      }
    };
    resize();
    animateParticles();
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      createParticle(e.clientX - rect.left, e.clientY - rect.top);
    };
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
    };
  }, [isHovered, isMobile, animate]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !animate || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    x.set(mouseXVal / width - 0.5);
    y.set(mouseYVal / height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const cardContent = (
    <div
      className={cn(
        "bg-white neo-border rounded-3xl overflow-hidden h-full flex flex-col motion-safe-layout relative",
        (!animate || isMobile) && "neo-shadow",
        className
      )}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {animate && !isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-50"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />
      )}
      {children}
    </div>
  );
  if (animate && !isMobile) {
    return (
      <div className="h-full" style={{ perspective: "1200px" }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            boxShadow: dynamicShadow,
            transformStyle: "preserve-3d",
            willChange: "transform, box-shadow"
          }}
          className="h-full rounded-3xl transition-shadow duration-300 ease-out"
        >
          {cardContent}
        </motion.div>
      </div>
    );
  }
  return cardContent;
}