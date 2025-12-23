import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -120]);
  return (
    <section id="hero" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Element */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 bg-pattern-parang opacity-[0.04] pointer-events-none -z-10"
      />
      <div className="py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 space-y-6 md:space-y-8 text-left"
        >
          <div className="inline-flex items-center gap-2 bg-lime neo-border shadow-neo-sm px-4 py-1.5 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
            INDONESIA HERITAGE AI
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[0.95] tracking-tighter uppercase">
              IDENTIFIKASI <br />
              <span className="text-coral underline decoration-black decoration-[6px] md:decoration-[10px] underline-offset-[4px] md:underline-offset-[8px]">BATIK</span> <br className="hidden sm:block" />
              INSTAN.
            </h1>
          </div>
          <p className="text-base md:text-xl lg:text-2xl font-medium text-muted-foreground max-w-lg leading-relaxed border-l-4 border-lime pl-4 md:pl-8">
            Ungkap identitas, asal daerah, dan filosofi sakral di balik setiap helai kain Batik Nusantara dengan presisi Vision AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#scanner" className="neo-btn bg-coral text-white text-base md:text-xl px-8 py-3 md:py-6 group rounded-2xl shadow-neo">
              Mulai Scan
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-base md:text-xl px-8 py-3 md:py-6 rounded-2xl shadow-neo group" asChild>
              <a href="#gallery">
                Katalog Motif
                <Sparkles className="w-5 h-5 ml-2 group-hover:text-coral transition-colors" />
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t-2 border-black/5">
            {[
              { icon: Zap, text: "Analisis Real-time" },
              { icon: Shield, text: "99% Akurasi Pola" },
              { icon: Globe, text: "600+ Database Motif" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 font-black italic text-[10px] md:text-xs tracking-tight uppercase group">
                <div className="bg-lime p-1 neo-border rounded-lg group-hover:rotate-6 transition-transform">
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-black stroke-[3px]" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          className="relative px-2 sm:px-6 mt-8 lg:mt-0"
        >
          {/* Decorative Frames */}
          <div className="absolute -inset-2 md:-inset-4 bg-pattern-batik opacity-[0.06] neo-border -z-10 rounded-[24px] rotate-2" />
          <div className="absolute -inset-2 md:-inset-4 bg-lime/10 neo-border -z-20 rounded-[24px] -rotate-1" />
          <div className="neo-border shadow-neo-lg bg-coral rounded-[24px] aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=90&w=1200"
              alt="Indonesian Batik Excellence"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            {/* Spinning Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 sm:-top-16 sm:-right-16 w-28 h-28 sm:w-48 sm:h-48 bg-lime neo-border rounded-full flex items-center justify-center p-4 text-center shadow-neo-lg z-20 pointer-events-none"
            >
              <p className="font-display font-black text-[7px] sm:text-[10px] leading-tight uppercase tracking-wider">
                • ASLI INDONESIA • TEKNOLOGI LOKAL • WARISAN DUNIA • BATIK LENS AI •
              </p>
            </motion.div>
            {/* Bottom Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white neo-border p-4 md:p-6 rounded-[20px] transition-all duration-500 z-10 shadow-neo">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-display font-black text-[10px] md:text-sm text-coral uppercase tracking-tighter">IDENTIFIKASI: PARANG RUSAK</p>
                  <p className="text-[8px] md:text-[10px] font-mono font-bold text-muted-foreground mt-0.5">MATCHED: 0.9928</p>
                </div>
                <div className="bg-lime neo-border px-2 py-0.5 rounded-full text-[9px] font-black shadow-neo-sm">100%</div>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden neo-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-coral"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}