import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar() {
  const [imgError, setImgError] = useState(false);
  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-lime w-10 h-10 md:w-12 md:h-12 flex items-center justify-center neo-border rounded-lg overflow-hidden transition-all group-hover:shadow-neo-sm group-hover:-rotate-2">
              {!imgError ? (
                <img 
                  src="/images/logo.png" 
                  alt="BatikLens Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Camera className="w-6 h-6 text-black" />
              )}
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold tracking-tighter transition-colors group-hover:text-coral">
              BatikLens
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-tight">
            <a href="#hero" className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all">Home</a>
            <a href="#scanner" className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all">Scanner</a>
            <a href="#gallery" className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all">Gallery</a>
            <Button className="neo-btn bg-coral text-black hover:bg-coral/90 px-6">
              Coba Gratis
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="neo-border bg-white">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}