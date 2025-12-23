import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -150]);
  return (
    <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 bg-pattern-parang opacity-[0.05] pointer-events-none -z-10"
      />
      <div className="py-12 md:py-20 lg:py-28 xl:py-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 space-y-6 md:space-y-8 text-left"
        >
          <div className="inline-flex items-center gap-3 bg-lime neo-border shadow-neo-sm px-4 py-1.5 rounded-3xl text-xs font-black uppercase tracking-[0.25em]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
            KECERDASAN BUDAYA
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-bold leading-[0.9] tracking-tighter uppercase hyphens-none overflow-hidden xl:whitespace-nowrap">
              IDENTIFIKASI <span className="text-coral underline decoration-black decoration-[6px] md:decoration-[10px] xl:decoration-[12px] underline-offset-[6px] md:underline-offset-[10px]">BATIK</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-md leading-relaxed border-l-6 border-lime pl-6 md:pl-8">
            Ungkap asal daerah dan filosofi sakral di balik setiap helai kain Nusantara dengan presisi Vision AI termutakhir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#scanner" className="neo-btn bg-coral text-white text-lg md:text-xl xl:text-2xl px-8 py-3 md:py-6 group rounded-3xl shadow-neo transition-all hover:shadow-neo-lg">
              Mulai Scan
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
              </motion.div>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-lg md:text-xl xl:text-2xl px-8 py-3 md:py-6 rounded-3xl shadow-neo group hover:shadow-neo-lg" asChild>
              <a href="#gallery">
                Katalog
                <Sparkles className="w-5 h-5 ml-2 group-hover:text-coral transition-colors" />
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t-3 border-black/5">
            {[
              { icon: Zap, text: "Analisis Instan" },
              { icon: Shield, text: "Akurasi Tinggi" },
              { icon: Globe, text: "600+ Database" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 font-black italic text-xs md:text-sm tracking-tight uppercase group">
                <div className="bg-lime p-1.5 neo-border rounded-lg group-hover:rotate-12 transition-transform">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-black stroke-[3px]" />
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
          className="relative px-2 sm:px-8 mt-10 lg:mt-0"
        >
          <div className="absolute -inset-2 md:-inset-6 bg-pattern-batik opacity-[0.06] neo-border -z-10 rounded-4xl rotate-2" />
          <div className="absolute -inset-2 md:-inset-6 bg-lime/15 neo-border -z-20 rounded-4xl -rotate-1" />
          <div className="neo-border shadow-neo-lg bg-coral rounded-4xl aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=95&w=1200"
              alt="Indonesian Batik Excellence"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 sm:-top-16 sm:-right-16 w-24 h-24 sm:w-48 sm:h-48 bg-lime neo-border rounded-full flex items-center justify-center p-4 text-center shadow-neo-lg z-20 pointer-events-none"
            >
              <p className="font-display font-black text-[7px] sm:text-[10px] leading-tight uppercase tracking-widest text-black">
                • ASLI • TEKNOLOGI LOKAL • WARISAN DUNIA • BATIK LENS AI •
              </p>
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 bg-white neo-border p-5 md:p-8 rounded-3xl transition-all duration-500 z-10 shadow-neo">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1 text-left">
                  <p className="font-display font-black text-xs md:text-lg text-coral uppercase tracking-tighter">SCAN_RESULT: PARANG</p>
                  <p className="text-[9px] md:text-xs font-mono font-bold text-muted-foreground">ID: BL-4092-X</p>
                </div>
                <div className="bg-lime neo-border px-3 py-1 rounded-4xl text-[10px] md:text-xs font-black shadow-neo-sm">99.4% MATCH</div>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden neo-border">
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