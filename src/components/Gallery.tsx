import React, { useState } from 'react';
import { NeoCard } from './ui/NeoCard';
import { galleryItems, type BatikMotif } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { BatikDetailModal } from './BatikDetailModal';
import { ArrowRight } from 'lucide-react';
export function Gallery() {
  const [selectedMotif, setSelectedMotif] = useState<BatikMotif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenDetail = (item: BatikMotif) => {
    setSelectedMotif(item);
    setIsModalOpen(true);
  };
  return (
    <section id="gallery" className="relative w-full py-16 md:py-32 bg-lime/10 border-y-3 border-black overflow-hidden">
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.04] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none">
            KATALOG <span className="text-coral">MOTIF</span>
          </h2>
          <p className="text-base md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Eksplorasi khazanah budaya Nusantara melalui arsip digital motif batik kami.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <NeoCard animate className="h-full bg-white rounded-2xl flex flex-col group cursor-default">
                <div className="aspect-video relative overflow-hidden neo-border-b-3 bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 bg-white neo-border px-3 py-1 text-[10px] md:text-xs font-black uppercase shadow-neo-sm rounded-2xl tracking-wider">
                    {item.origin}
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col text-left">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-coral leading-none group-hover:underline underline-offset-4 decoration-black">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-sm md:text-base font-medium flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-6 flex justify-between items-center border-t-2 border-dashed border-gray-200">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="text-black font-black text-xs md:text-sm uppercase tracking-widest hover:text-coral transition-colors flex items-center gap-2"
                    >
                      LIHAT DETAIL <ArrowRight className="w-4 h-4" />
                    </button>
                    <div
                      onClick={() => handleOpenDetail(item)}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-black text-white flex items-center justify-center neo-border cursor-pointer hover:bg-lime hover:text-black transition-all active:scale-95 shadow-neo-sm"
                    >
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
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