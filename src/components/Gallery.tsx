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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  return (
    <section id="gallery" className="relative w-full py-20 md:py-40 bg-lime/10 border-y-3 border-black overflow-hidden">
      <div className="absolute inset-0 bg-pattern-batik pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 md:mb-32 space-y-6">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none">
            KATALOG <span className="text-coral underline decoration-black decoration-[8px] underline-offset-8">MOTIF</span>
          </h2>
          <p className="text-lg md:text-3xl font-medium text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            Eksplorasi khazanah budaya Nusantara melalui arsip digital motif batik kami yang terus berkembang.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <NeoCard animate className="h-full bg-white rounded-3xl flex flex-col group cursor-default">
                <div
                  className="aspect-video relative overflow-hidden border-b-3 border-black bg-gray-100 cursor-pointer rounded-t-3xl"
                  onClick={() => handleOpenDetail(item)}
                  role="button"
                  aria-label={`Lihat gambar motif ${item.name}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={`Contoh motif batik ${item.name} dari ${item.origin}`}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-5 left-5 bg-white neo-border px-4 py-1.5 text-xs md:text-sm font-black uppercase shadow-neo-sm rounded-3xl tracking-widest">
                    {item.origin}
                  </div>
                </div>
                <div className="p-8 md:p-10 space-y-6 flex-grow flex flex-col text-left">
                  <h3
                    className="text-3xl md:text-4xl font-display font-bold text-coral leading-[0.9] group-hover:text-black cursor-pointer transition-colors uppercase tracking-tight"
                    onClick={() => handleOpenDetail(item)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-base md:text-lg font-medium flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-8 flex justify-between items-center border-t-3 border-dashed border-gray-200">
                    <button
                      onClick={() => handleOpenDetail(item)}
                      aria-label={`Buka arsip detail untuk ${item.name}`}
                      className="text-black font-black text-sm md:text-base uppercase tracking-widest hover:text-coral transition-colors flex items-center gap-3 group/btn"
                    >
                      LIHAT ARSIP
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-3xl bg-black text-white flex items-center justify-center neo-border cursor-pointer hover:bg-lime hover:text-black transition-all active:scale-90 shadow-neo-sm"
                      aria-label={`Tampilkan informasi selengkapnya tentang ${item.name}`}
                    >
                      <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <BatikDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        motif={selectedMotif}
      />
    </section>
  );
}