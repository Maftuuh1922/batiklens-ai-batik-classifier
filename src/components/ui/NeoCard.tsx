import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export function NeoCard({ children, className, animate = false }: NeoCardProps) {
  const content = (
    <div className={cn(
      "bg-white neo-border neo-shadow rounded-2xl overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
  if (animate) {
    return (
      <motion.div
        whileHover={{ y: -5, x: -5, boxShadow: '10px 10px 0px 0px #000' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {content}
      </motion.div>
    );
  }
  return content;
}