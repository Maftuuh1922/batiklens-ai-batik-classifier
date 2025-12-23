import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export function NeoCard({ children, className, animate = false }: NeoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Smooth springs
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });
  // Transforms for 3D rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  // Transform for dynamic shadow
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [10, 2]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [10, 2]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !animate) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    // Normalize to range [-0.5, 0.5]
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
        "bg-white neo-border rounded-2xl overflow-hidden h-full",
        !animate && "neo-shadow",
        className
      )}
    >
      {children}
    </div>
  );
  if (animate) {
    return (
      <div 
        className="perspective-[1000px] h-full"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow: useTransform(
              [shadowX, shadowY],
              ([sx, sy]) => `${sx}px ${sy}px 0px 0px #000000`
            )
          }}
          className="h-full rounded-2xl transition-shadow duration-200"
        >
          {cardContent}
        </motion.div>
      </div>
    );
  }
  return cardContent;
}