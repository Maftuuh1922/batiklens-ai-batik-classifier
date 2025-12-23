import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <a
      href="#hero"
      onClick={onClick}
      className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all font-bold uppercase tracking-tight"
    >
      Home
    </a>
    <a
      href="#scanner"
      onClick={onClick}
      className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all font-bold uppercase tracking-tight"
    >
      Scanner
    </a>
    <a
      href="#gallery"
      onClick={onClick}
      className="hover:text-coral transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-coral after:transition-all font-bold uppercase tracking-tight"
    >
      Gallery
    </a>
  </div>
);
export function Navbar() {
  const [imgError, setImgError] = useState(false);
  return (
    <nav className="glass-nav relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <motion.div
            className="flex items-center gap-2 md:gap-3 cursor-pointer group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-lime w-8 h-8 md:w-12 md:h-12 flex items-center justify-center neo-border rounded-xl md:rounded-2xl overflow-hidden transition-all group-hover:shadow-neo-sm group-hover:-rotate-2">
              {!imgError ? (
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=BL&backgroundColor=A3E635"
                  alt="BatikLens Logo"
                  className="w-full h-full object-contain p-1"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Camera className="w-5 h-5 md:w-6 md:h-6 text-black" />
              )}
            </div>
            <span className="font-display text-xl md:text-3xl font-bold tracking-tighter transition-colors group-hover:text-coral">
              BatikLens
            </span>
          </motion.div>
          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center gap-12" />
          {/* Mobile Navigation with Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="neo-border bg-white hover:bg-lime/10 transition-colors rounded-xl h-9 w-9">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] border-l-3 border-black p-0 bg-background outline-none">
                <SheetHeader className="p-4 md:p-6 border-b-3 border-black bg-coral/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white w-9 h-9 flex items-center justify-center neo-border rounded-xl">
                        <Camera className="w-5 h-5 text-coral" />
                      </div>
                      <SheetTitle className="font-display text-xl font-bold tracking-tighter text-coral">
                        BatikLens
                      </SheetTitle>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="neo-border bg-white rounded-xl h-9 w-9">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex flex-col p-4 md:p-6 h-[calc(100vh-80px)] relative">
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <nav className="flex flex-col gap-6 md:gap-8 mt-6 relative z-10">
                    <SheetClose asChild>
                      <a href="#hero" className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Home
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#scanner" className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Scanner
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#gallery" className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Gallery
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto pb-8 relative z-10">
                    <div className="p-4 bg-coral/10 neo-border rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-coral mb-1 text-left">Heritage AI</p>
                      <p className="text-xs md:text-sm font-medium leading-tight text-left">
                        Melindungi warisan budaya Nusantara melalui teknologi Vision AI terbaru.
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