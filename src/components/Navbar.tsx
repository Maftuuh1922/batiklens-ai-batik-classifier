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
        <span className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-lime transition-all duration-300" />
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
    <nav className={`glass-nav sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? 'h-18 md:h-20 shadow-neo-sm' : 'h-24 md:h-28'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <motion.div
            className="flex items-center gap-4 md:gap-6 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-lime w-12 h-12 md:w-16 md:h-16 flex items-center justify-center neo-border rounded-2xl md:rounded-3xl overflow-hidden transition-all group-hover:shadow-neo-sm group-hover:-rotate-3">
              {!imgError ? (
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=BL&backgroundColor=A3E635&fontFamily=Courier&bold=true"
                  alt="BatikLens Logo"
                  className="w-full h-full object-contain p-1.5"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-black" />
              )}
            </div>
            <span className="font-display text-3xl md:text-5xl font-bold tracking-tighter transition-colors group-hover:text-coral leading-none uppercase">
              BatikLens
            </span>
          </motion.div>
          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center gap-14" />
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="neo-border bg-white hover:bg-lime transition-colors rounded-2xl h-12 w-12 shadow-neo-sm">
                  <Menu className="w-8 h-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[450px] border-l-3 border-black p-0 bg-background outline-none">
                <SheetHeader className="p-8 border-b-3 border-black bg-coral/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white w-12 h-12 flex items-center justify-center neo-border rounded-2xl shadow-neo-sm">
                        <Camera className="w-8 h-8 text-coral" />
                      </div>
                      <SheetTitle className="font-display text-3xl font-bold tracking-tighter text-coral uppercase">
                        BatikLens
                      </SheetTitle>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="neo-border bg-white rounded-2xl h-12 w-12 shadow-neo-sm active:scale-95">
                        <X className="h-8 w-8" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex flex-col p-10 h-[calc(100vh-120px)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.05] pointer-events-none" />
                  <nav className="flex flex-col gap-10 mt-10 relative z-10">
                    {['Home', 'Scanner', 'Gallery'].map((label) => (
                      <SheetClose key={label} asChild>
                        <a href={`#${label.toLowerCase()}`} className="text-5xl sm:text-6xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-all flex items-center justify-between group active:scale-[0.98]">
                          {label}
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="text-lime group-hover:text-coral"
                          >
                            <ArrowRight size={48} />
                          </motion.div>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto pb-12 relative z-10">
                    <div className="p-8 bg-white neo-border rounded-3xl shadow-neo">
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-coral mb-3">Heritage Guardian AI</p>
                      <p className="text-base sm:text-lg font-bold leading-relaxed text-black">
                        Melindungi dan mendigitalkan warisan budaya Nusantara melalui teknologi Vision AI termutakhir dengan 600+ database motif.
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