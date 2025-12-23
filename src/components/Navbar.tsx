import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
const NavLinks = ({ className = "", onClick = () => {} }: { className?: string; onClick?: () => void }) => (
  <div className={className}>
    {['Home', 'Scanner', 'Gallery'].map((label) => (
      <a
        key={label}
        href={`#${label.toLowerCase()}`}
        onClick={onClick}
        className="hover:text-coral transition-colors relative font-black uppercase tracking-widest text-sm py-2 group"
      >
        {label}
        <span className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-lime transition-all duration-300" />
      </a>
    ))}
  </div>
);
export function Navbar() {
  const [imgError, setImgError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`glass-nav sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? 'h-16 md:h-18 shadow-neo-sm' : 'h-20 md:h-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <motion.div
            className="flex items-center gap-3 md:gap-4 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-lime w-10 h-10 md:w-14 md:h-14 flex items-center justify-center neo-border rounded-xl md:rounded-2xl overflow-hidden transition-all group-hover:shadow-neo-sm group-hover:-rotate-2">
              {!imgError ? (
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=BL&backgroundColor=A3E635&fontFamily=Courier&bold=true"
                  alt="BatikLens Logo"
                  className="w-full h-full object-contain p-1"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Camera className="w-6 h-6 md:w-8 md:h-8 text-black" />
              )}
            </div>
            <span className="font-display text-2xl md:text-4xl font-bold tracking-tighter transition-colors group-hover:text-coral leading-none">
              BatikLens
            </span>
          </motion.div>
          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center gap-12" />
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="neo-border bg-white hover:bg-lime transition-colors rounded-xl h-10 w-10 shadow-neo-sm">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] border-l-3 border-black p-0 bg-background outline-none">
                <SheetHeader className="p-6 border-b-3 border-black bg-coral/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white w-10 h-10 flex items-center justify-center neo-border rounded-xl shadow-neo-sm">
                        <Camera className="w-6 h-6 text-coral" />
                      </div>
                      <SheetTitle className="font-display text-2xl font-bold tracking-tighter text-coral">
                        BatikLens
                      </SheetTitle>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="neo-border bg-white rounded-xl h-10 w-10 shadow-neo-sm active:scale-95">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex flex-col p-8 h-[calc(100vh-100px)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <nav className="flex flex-col gap-8 mt-8 relative z-10">
                    {['Home', 'Scanner', 'Gallery'].map((label) => (
                      <SheetClose key={label} asChild>
                        <a href={`#${label.toLowerCase()}`} className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-all flex items-center justify-between group active:scale-[0.98]">
                          {label}
                          <motion.div 
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="text-lime group-hover:text-coral"
                          >
                            <ArrowRight size={32} />
                          </motion.div>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto pb-10 relative z-10">
                    <div className="p-6 bg-white neo-border rounded-2xl shadow-neo">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-coral mb-2">Heritage Guardian AI</p>
                      <p className="text-sm font-bold leading-relaxed text-black">
                        Melindungi dan mendigitalkan warisan budaya Nusantara melalui teknologi Vision AI termutakhir.
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}