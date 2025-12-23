import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -100]);
  return (
    <section id="hero" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Parallax Batik Background Layer */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none -z-10"
      />
      <div className="py-12 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 space-y-8 md:space-y-10"
        >
          <div className="inline-flex items-center gap-2 bg-lime neo-border neo-shadow-sm px-4 py-1.5 rounded-full text-xs md:text-sm font-black uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            AI-POWERED HERITAGE
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter">
              IDENTIFIKASI <br />
              <span className="text-coral underline decoration-black decoration-8 underline-offset-8">BATIK</span> INSTAN.
            </h1>
          </div>
          <p className="text-lg md:text-2xl font-medium text-muted-foreground max-w-lg leading-relaxed border-l-4 border-lime pl-6">
            Gunakan kekuatan Vision AI untuk mengungkap identitas, daerah asal, dan filosofi di balik setiap helai kain Batik Nusantara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
            <a href="#scanner" className="neo-btn bg-coral text-black text-lg md:text-xl px-8 md:px-10 py-6 md:py-8 group">
              Mulai Scan
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.span>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-lg md:text-xl px-8 md:px-10 py-6 md:py-8" asChild>
              <a href="#gallery">Katalog Motif</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4 pt-6 opacity-80">
            {[
              { icon: Zap, text: "Real-time" },
              { icon: Shield, text: "99% Akurat" },
              { icon: Globe, text: "Budaya RI" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-black italic text-xs md:text-sm tracking-tight uppercase">
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-coral stroke-[3px]" /> {item.text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-2 sm:px-4 mt-8 lg:mt-0"
        >
          {/* Decorative Kawung Border Frame */}
          <div className="absolute -inset-4 bg-pattern-batik opacity-10 neo-border -z-10 rounded-3xl" />
          <div className="neo-border neo-shadow-lg bg-coral rounded-3xl aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=1000"
              alt="Indonesian Batik Excellence"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-32 h-32 sm:w-44 sm:h-44 bg-lime neo-border rounded-full flex items-center justify-center p-4 sm:p-6 text-center shadow-neo-lg z-20 pointer-events-none"
            >
              <p className="font-display font-black text-[8px] sm:text-[10px] leading-tight uppercase">
                ASLI INDONESIA • TEKNOLOGI LOKAL • WARISAN DUNIA • BATIK LENS •
              </p>
            </motion.div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm neo-border p-4 rounded-xl translate-y-2 lg:translate-y-20 lg:group-hover:translate-y-0 transition-transform duration-500 z-10">
              <p className="font-display font-bold text-sm">MOTIF: PARANG RUSAK</p>
              <p className="text-xs font-mono text-muted-foreground">SCAN CONFIDENCE: 100%</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 sm:w-24 sm:h-24 bg-lime neo-border rounded-2xl -z-10 animate-bounce" />
          <div className="absolute top-1/2 -right-6 w-12 h-12 sm:w-16 sm:h-16 bg-white neo-border rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}