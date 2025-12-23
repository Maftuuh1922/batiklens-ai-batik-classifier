import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
export function Hero() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-16 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 bg-lime neo-border neo-shadow-sm px-4 py-1.5 rounded-full text-xs md:text-sm font-black uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            AI-POWERED HERITAGE
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter">
              IDENTIFIKASI <br />
              <span className="text-coral underline decoration-black decoration-8 underline-offset-8">BATIK</span> INSTAN.
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-lg leading-relaxed border-l-4 border-lime pl-6">
            Gunakan kekuatan Vision AI untuk mengungkap identitas, daerah asal, dan filosofi di balik setiap helai kain Batik Nusantara.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <a href="#scanner" className="neo-btn bg-coral text-black text-xl px-10 py-8 group">
              Mulai Scan 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.span>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-xl px-10 py-8" asChild>
              <a href="#gallery">Katalog Motif</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 opacity-80">
            {[
              { icon: Zap, text: "Real-time" },
              { icon: Shield, text: "99% Akurat" },
              { icon: Globe, text: "Budaya RI" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-black italic text-sm tracking-tight uppercase">
                <item.icon className="w-5 h-5 text-coral stroke-[3px]" /> {item.text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-4"
        >
          <div className="neo-border neo-shadow-lg bg-coral rounded-3xl aspect-[4/5] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=80&w=1000"
              alt="Indonesian Batik Excellence"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Animated Rotating Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-44 h-44 bg-lime neo-border rounded-full flex items-center justify-center p-6 text-center shadow-neo-lg z-10"
            >
              <p className="font-display font-black text-[10px] leading-tight uppercase">
                ASLI INDONESIA • TEKNOLOGI LOKAL • WARISAN DUNIA • BATIK LENS •
              </p>
            </motion.div>
            {/* Bottom Tag */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm neo-border p-4 rounded-xl translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-display font-bold text-sm">MOTIF: PARANG RUSAK</p>
              <p className="text-xs font-mono text-muted-foreground">SCAN CONFIDENCE: 100%</p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lime neo-border rounded-2xl -z-10 animate-bounce" />
          <div className="absolute top-1/2 -right-8 w-16 h-16 bg-white neo-border rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}