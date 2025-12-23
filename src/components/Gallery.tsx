import React, { useState } from 'react';
import { NeoCard } from './ui/NeoCard';
import { galleryItems, type BatikMotif } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { BatikDetailModal } from './BatikDetailModal';
export function Gallery() {
  const [selectedMotif, setSelectedMotif] = useState<BatikMotif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenDetail = (item: BatikMotif) => {
    setSelectedMotif(item);
    setIsModalOpen(true);
  };
  return (
    <section id="gallery" className="relative w-full py-20 bg-lime/10 neo-border-y-3 overflow-hidden">
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.04] pointer-events-none" />
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
          <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight">KATALOG MOTIF</h2>
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
              <NeoCard animate className="h-full bg-white rounded-2xl">
                <div className="aspect-video relative overflow-hidden neo-border-b-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white neo-border px-3 py-1 text-xs font-bold uppercase shadow-neo-sm rounded-2xl">
                    {item.origin}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-display font-bold text-coral">{item.name}</h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm font-medium">
                    {item.description}
                  </p>
                  <div className="pt-4 flex justify-between items-center border-t-2 border-dashed border-gray-200">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="text-coral-light font-bold text-sm hover:underline underline-offset-4"
                    >
                      LIHAT DETAIL
                    </button>
                    <div
                      onClick={() => handleOpenDetail(item)}
                      className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center neo-border cursor-pointer hover:bg-coral transition-colors"
                    >
                      →
                    </div>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </div>
      <BatikDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        motif={selectedMotif}
      />
    </section>
  );
}