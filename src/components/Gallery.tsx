import React from 'react';
import { NeoCard } from './ui/NeoCard';
import { galleryItems } from '@/lib/mockData';
import { motion } from 'framer-motion';
export function Gallery() {
  return (
    <section id="gallery" className="relative w-full py-20 bg-lime/10 neo-border-y-3 overflow-hidden">
      {/* Sogan Repeating Background */}
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.04] pointer-events-none" />
      {/* Decorative Corner Accents */}
      <motion.div 
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        className="absolute -top-10 -left-10 w-40 h-40 bg-pattern-parang neo-border rounded-full pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, rotate: 45 }}
        whileInView={{ opacity: 0.1, rotate: 0 }}
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-pattern-parang neo-border rounded-full pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-display font-bold">KATALOG MOTIF</h2>
          <p className="text-xl font-medium text-muted-foreground">Pelajari berbagai motif batik dari seluruh Nusantara.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <NeoCard animate className="h-full bg-white">
                <div className="aspect-video relative overflow-hidden neo-border-b-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white neo-border px-2 py-0.5 text-xs font-bold uppercase shadow-neo-sm">
                    {item.origin}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-display font-bold">{item.name}</h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm font-medium">
                    {item.description}
                  </p>
                  <div className="pt-4 flex justify-between items-center border-t-2 border-dashed border-gray-200">
                    <span className="text-coral font-bold text-sm">LIHAT DETAIL</span>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center neo-border">
                      →
                    </div>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}