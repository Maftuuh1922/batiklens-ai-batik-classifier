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
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-lime w-10 h-10 md:w-12 md:h-12 flex items-center justify-center neo-border rounded-2xl overflow-hidden transition-all group-hover:shadow-neo-sm group-hover:-rotate-2">
              {!imgError ? (
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=BL&backgroundColor=A3E635"
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
          {/* Desktop Navigation */}
          <NavLinks className="hidden md:flex items-center gap-12" />
          {/* Mobile Navigation with Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="neo-border bg-white hover:bg-lime/10 transition-colors rounded-2xl">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-3 border-black p-0 bg-background outline-none">
                <SheetHeader className="p-6 border-b-3 border-black bg-coral/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white w-10 h-10 flex items-center justify-center neo-border rounded-2xl">
                        <Camera className="w-6 h-6 text-coral" />
                      </div>
                      <SheetTitle className="font-display text-2xl font-bold tracking-tighter text-coral">
                        BatikLens
                      </SheetTitle>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="neo-border bg-white rounded-2xl">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex flex-col p-6 h-[calc(100vh-100px)] relative">
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <nav className="flex flex-col gap-8 mt-8 relative z-10">
                    <SheetClose asChild>
                      <a href="#hero" className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Home
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#scanner" className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Scanner
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a href="#gallery" className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-coral transition-colors flex items-center justify-between group">
                        Gallery
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-coral">→</span>
                      </a>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto pb-12 relative z-10">
                    <div className="p-4 bg-coral/10 neo-border rounded-2xl">
                      <p className="text-xs font-black uppercase tracking-widest text-coral mb-2 text-left">Heritage AI</p>
                      <p className="text-sm font-medium leading-tight text-left">
                        Melindungi warisan budaya Nusantara melalui teknologi Vision AI terbaru.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-pattern-batik opacity-40" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-pattern-batik opacity-30 pointer-events-none" />
    </nav>
  );
}