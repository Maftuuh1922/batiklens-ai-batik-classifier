import React from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
const ParangPath = "M0,0 L100,100 M20,0 L100,80 M0,20 L80,100";
const KawungPath = "M50,0 Q100,0 100,50 Q100,100 50,100 Q0,100 0,50 Q0,0 50,0";
function BatikMorph() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-[120%] h-[120%] text-coral stroke-[0.5] fill-none"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <pattern id="morphPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <motion.path
            d={ParangPath}
            animate={{ d: [ParangPath, KawungPath, ParangPath] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
        <rect width="100" height="100" fill="url(#morphPattern)" />
      </motion.svg>
    </div>
  );
}
export function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -120]);
  const rotateParallax = useTransform(scrollY, [0, 1000], [0, 5]);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };
  return (
    <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        style={{ y: yParallax, rotate: rotateParallax }}
        className="absolute inset-0 bg-pattern-parang pointer-events-none -z-10"
      />
      <BatikMorph />
      <div className="py-10 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 space-y-6 md:space-y-8 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 bg-lime neo-border shadow-neo-sm px-4 py-1.5 rounded-3xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
            KECERDASAN BUDAYA NUSANTARA
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-[900] leading-[1.1] tracking-tight uppercase break-words">
              <span>IDENTIFIKASI</span>
              <br />
              <span className="text-coral underline decoration-black decoration-[4px] md:decoration-[8px] lg:decoration-[10px] underline-offset-[4px] md:underline-offset-[8px]">BATIK</span>
              {" INSTAN."}
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl font-medium text-muted-foreground max-w-xl leading-relaxed border-l-4 md:border-l-6 border-lime pl-5 md:pl-8">
            Ungkap asal daerah dan filosofi sakral di balik setiap helai kain Nusantara dengan presisi Vision AI termutakhir.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#scanner" className="neo-btn bg-coral text-white text-lg px-8 py-4 group rounded-3xl shadow-neo-sm hover:shadow-neo-lg transition-all">
              Mulai Scan
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </a>
            <Button variant="outline" className="neo-btn bg-white text-black text-lg px-8 py-4 rounded-3xl shadow-neo-sm group hover:shadow-neo-lg" asChild>
              <a href="#gallery">
                Katalog
                <Sparkles className="w-5 h-5 ml-2 group-hover:text-coral transition-colors" />
              </a>
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-x-6 gap-y-4 pt-8 border-t-3 border-black/5">
            {[
              { icon: Zap, text: "Analisis Instan" },
              { icon: Shield, text: "Akurasi Tinggi" },
              { icon: Globe, text: "600+ Database" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 font-black italic text-[11px] md:text-xs tracking-tight uppercase group">
                <div className="bg-lime p-1.5 neo-border rounded-lg group-hover:rotate-12 transition-transform shadow-neo-sm">
                  <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-black stroke-[3px]" />
                </div>
                {item.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="relative mt-8 lg:mt-0 px-2"
        >
          <div className="absolute -inset-4 bg-pattern-batik neo-border -z-10 rounded-4xl rotate-2 opacity-10" />
          <div className="absolute -inset-4 bg-lime/10 neo-border -z-20 rounded-4xl -rotate-1" />
          <div className="neo-border shadow-neo-sm bg-white rounded-4xl aspect-[4/3] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&q=90&w=1000"
              alt="Indonesian Batik Preview"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-lime neo-border rounded-full flex items-center justify-center p-3 text-center shadow-neo-sm z-20 pointer-events-none"
            >
              <p className="font-display font-black text-[7px] md:text-[9px] leading-tight uppercase tracking-widest text-black">
                • ASLI • TEKNOLOGI LOKAL • WARISAN DUNIA •
              </p>
            </motion.div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm neo-border p-4 md:p-5 rounded-3xl z-10 shadow-neo-sm">
              <div className="flex justify-between items-start mb-2.5">
                <div className="space-y-0.5">
                  <p className="font-display font-black text-[10px] md:text-xs text-coral uppercase">SCAN_RESULT: PARANG</p>
                  <p className="text-[8px] md:text-[9px] font-mono text-muted-foreground">REF: BL-AR-2025</p>
                </div>
                <div className="bg-lime neo-border px-2.5 py-0.5 rounded-full text-[10px] md:text-[11px] font-black shadow-neo-sm">99.4% MATCH</div>
              </div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "99.4%" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
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