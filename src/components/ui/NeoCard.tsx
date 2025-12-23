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
  // Transforms for 3D rotation - Disabled on mobile for UX
  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-10, 10]);
  // Transform for dynamic shadow that follows the "light" source
  const shadowX = useTransform(mouseX, [-0.5, 0.5], isMobile ? [6, 6] : [10, 2]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], isMobile ? [6, 6] : [10, 2]);
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
        "bg-white neo-border rounded-2xl overflow-hidden h-full flex flex-col",
        (!animate || isMobile) && "neo-shadow",
        className
      )}
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
            willChange: "transform"
          }}
          className="h-full rounded-2xl transition-shadow duration-300 ease-out"
        >
          {cardContent}
        </motion.div>
      </div>
    );
  }
  return cardContent;
}