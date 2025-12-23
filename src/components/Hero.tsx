import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -150]);
  return (
    <section id="hero" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 bg-pattern-parang opacity-[0.05] pointer-events-none -z-10"
      />
      <div className="py-16 md:py-28 lg:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 space-y-8 md:space-y-12 text-left"
        >
          <div className="inline-flex items-center gap-3 bg-lime neo-border shadow-neo-sm px-5 py-2 rounded-3xl text-xs md:text-sm font-black uppercase tracking-[0.25em]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
            </span>
            INDONESIA HERITAGE AI
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[0.85] tracking-tighter uppercase">
              IDENTIFIKASI <br />
              <span className="text-coral underline decoration-black decoration-[8px] md:decoration-[14px] underline-offset-[8px] md:underline-offset-[12px]">BATIK</span> <br className="hidden sm:block" />
              INSTAN.
            </h1>
          </div>
          <p className="text-lg md:text-2xl lg:text-3xl font-medium text-muted-foreground max-w-xl leading-relaxed border-l-8 border-lime pl-6 md:pl-10">
            Ungkap identitas, asal daerah, dan filosofi sakral di balik setiap helai kain Batik Nusantara dengan presisi Vision AI termutakhir.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <a href="#scanner" className="neo-btn bg-coral text-white text-xl md:text-2xl px-10 py-4 md:py-8 group rounded-3xl shadow-neo transition-all hover:shadow-neo-lg">
              Mulai Scan
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-xl md:text-2xl px-10 py-4 md:py-8 rounded-3xl shadow-neo group hover:shadow-neo-lg" asChild>
              <a href="#gallery">
                Katalog Motif
                <Sparkles className="w-6 h-6 ml-3 group-hover:text-coral transition-colors" />
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-6 pt-10 border-t-4 border-black/5">
            {[
              { icon: Zap, text: "Analisis Real-time" },
              { icon: Shield, text: "99.4% Akurasi Pola" },
              { icon: Globe, text: "600+ Database Motif" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 font-black italic text-sm md:text-base tracking-tight uppercase group">
                <div className="bg-lime p-2 neo-border rounded-xl group-hover:rotate-12 transition-transform">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[3px]" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.3 }}
          className="relative px-4 sm:px-10 mt-12 lg:mt-0"
        >
          {/* Decorative Frames with 40px radius */}
          <div className="absolute -inset-4 md:-inset-8 bg-pattern-batik opacity-[0.08] neo-border -z-10 rounded-4xl rotate-3" />
          <div className="absolute -inset-4 md:-inset-8 bg-lime/20 neo-border -z-20 rounded-4xl -rotate-2" />
          <div className="neo-border shadow-neo-lg bg-coral rounded-4xl aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=95&w=1200"
              alt="Indonesian Batik Excellence"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
            {/* Spinning Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -right-12 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-60 sm:h-60 bg-lime neo-border rounded-full flex items-center justify-center p-6 text-center shadow-neo-lg z-20 pointer-events-none"
            >
              <p className="font-display font-black text-[8px] sm:text-[12px] leading-tight uppercase tracking-widest text-black">
                • ASLI INDONESIA • TEKNOLOGI LOKAL • WARISAN DUNIA • BATIK LENS AI •
              </p>
            </motion.div>
            {/* Bottom Card Overlay with 32px radius */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 bg-white neo-border p-6 md:p-10 rounded-3xl transition-all duration-500 z-10 shadow-neo">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <p className="font-display font-black text-xs md:text-xl text-coral uppercase tracking-tighter">IDENTIFIKASI: PARANG RUSAK</p>
                  <p className="text-[10px] md:text-sm font-mono font-bold text-muted-foreground">SCAN_ID: BL-4092-X</p>
                </div>
                <div className="bg-lime neo-border px-4 py-1.5 rounded-4xl text-xs md:text-sm font-black shadow-neo-sm">99.4% MATCH</div>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden neo-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "99.4%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
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