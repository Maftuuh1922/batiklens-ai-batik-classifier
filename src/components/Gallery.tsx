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
    <section id="gallery" className="relative w-full py-12 md:py-20 bg-lime/10 neo-border-y-3 overflow-hidden">
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.04] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight">KATALOG MOTIF</h2>
          <p className="text-base md:text-xl font-medium text-muted-foreground px-4">Pelajari berbagai motif batik dari seluruh Nusantara.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <NeoCard animate className="h-full bg-white rounded-2xl flex flex-col">
                <div className="aspect-video relative overflow-hidden neo-border-b-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white neo-border px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold uppercase shadow-neo-sm rounded-2xl">
                    {item.origin}
                  </div>
                </div>
                <div className="p-4 md:p-6 space-y-2 md:space-y-3 flex-grow flex flex-col">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-coral">{item.name}</h3>
                  <p className="text-muted-foreground line-clamp-3 text-xs md:text-sm font-medium flex-grow">
                    {item.description}
                  </p>
                  <div className="pt-3 md:pt-4 flex justify-between items-center border-t-2 border-dashed border-gray-200">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="text-coral-light font-bold text-xs md:text-sm hover:underline underline-offset-4"
                    >
                      LIHAT DETAIL
                    </button>
                    <div
                      onClick={() => handleOpenDetail(item)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-black text-white flex items-center justify-center neo-border cursor-pointer hover:bg-coral transition-colors"
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
    </section>
  );
}