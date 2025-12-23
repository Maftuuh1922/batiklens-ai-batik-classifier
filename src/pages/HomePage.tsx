import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Scanner } from '@/components/Scanner';
import { Gallery } from '@/components/Gallery';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-lime selection:text-black">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Scanner />
        <Gallery />
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}