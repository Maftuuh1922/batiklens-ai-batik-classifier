import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
export function Hero() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-block bg-lime neo-border neo-shadow-sm px-4 py-1 rounded-full text-sm font-bold">
            ✨ AI-POWERED HERITAGE
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
            IDENTIFIKASI <span className="text-coral">BATIK</span> INSTAN.
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-lg leading-relaxed">
            Teknologi AI tercanggih untuk mengenali motif dan filosofi Batik Indonesia dalam hitungan detik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#scanner" className="neo-btn bg-coral text-black text-lg px-8 py-6">
              Mulai Scan <ArrowRight className="w-5 h-5" />
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-lg px-8 py-6">
              Lihat Galeri
            </Button>
          </div>
          <div className="flex gap-6 pt-4">
            {[
              { icon: Zap, text: "Cepat" },
              { icon: Shield, text: "Akurat" },
              { icon: Globe, text: "Warisan" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-bold italic">
                <item.icon className="w-5 h-5 text-coral" /> {item.text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="neo-border neo-shadow bg-coral rounded-2xl aspect-square relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=1000" 
              alt="Batik Pattern"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -right-12 w-40 h-40 bg-lime neo-border rounded-full flex items-center justify-center p-4 text-center font-display font-bold text-xs"
            >
              ASLI INDONESIA • BATIK LENS • 2025 •
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}