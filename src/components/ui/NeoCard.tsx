import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export function NeoCard({ children, className, animate = false }: NeoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Smooth springs for fluid motion
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });
  // Transforms for 3D rotation - Evaluated via function mapping to ensure stability across resizing
  const rotateX = useTransform(mouseY, (val) => isMobile ? 0 : val * -20);
  const rotateY = useTransform(mouseX, (val) => isMobile ? 0 : val * 20);
  // Dynamic shadow that follows the "light" source
  const shadowX = useTransform(mouseX, (val) => isMobile ? 6 : 6 + (val * -8));
  const shadowY = useTransform(mouseY, (val) => isMobile ? 6 : 6 + (val * -8));
  const dynamicShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) => `${sx}px ${sy}px 0px 0px #000000`
  );
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
  };
  const cardContent = (
    <div
      className={cn(
        "bg-white neo-border rounded-3xl overflow-hidden h-full flex flex-col motion-safe-layout",
        (!animate || isMobile) && "neo-shadow",
        className
      )}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {children}
    </div>
  );
  if (animate && !isMobile) {
    return (
      <div className="h-full" style={{ perspective: "1200px" }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
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