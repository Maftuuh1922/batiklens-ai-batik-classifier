import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu } from 'lucide-react';
export function Navbar() {
  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="bg-lime p-1 neo-border rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">BatikLens</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#hero" className="hover:text-coral transition-colors">Home</a>
            <a href="#scanner" className="hover:text-coral transition-colors">Scanner</a>
            <a href="#gallery" className="hover:text-coral transition-colors">Gallery</a>
            <Button className="neo-btn bg-coral text-black hover:bg-coral/90">
              Coba Gratis
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="neo-border">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}