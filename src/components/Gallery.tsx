import React, { useState, useMemo, useRef } from 'react';
import { NeoCard } from './ui/NeoCard';
import { galleryItems, type BatikMotif } from '@/lib/mockData';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { BatikDetailModal } from './BatikDetailModal';
import { ArrowRight, Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
const ITEMS_PER_PAGE = 6;
export function Gallery() {
  const [selectedMotif, setSelectedMotif] = useState<BatikMotif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return galleryItems;
    return galleryItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.origin.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const handleOpenDetail = (item: BatikMotif) => {
    setSelectedMotif(item);
    setIsModalOpen(true);
  };
  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      transition: { duration: 0.2 } 
    }
  };
  return (
    <section id="gallery" className="relative w-full py-20 md:py-40 bg-lime/10 border-y-3 border-black overflow-hidden">
      <div className="absolute inset-0 bg-pattern-batik pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none">
            KATALOG <span className="text-coral underline decoration-black decoration-[8px] underline-offset-8">MOTIF</span>
          </h2>
          <p className="text-lg md:text-3xl font-medium text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            Eksplorasi khazanah budaya Nusantara melalui arsip digital motif batik kami yang terus berkembang.
          </p>
        </div>
        {/* Neobrutalist Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-24 px-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-black rounded-3xl translate-x-1.5 translate-y-1.5 transition-transform group-focus-within:translate-x-0 group-focus-within:translate-y-0" />
            <div className="relative flex items-center bg-white neo-border rounded-3xl overflow-hidden px-6 py-2 md:py-3 transition-transform group-focus-within:-translate-x-0.5 group-focus-within:-translate-y-0.5">
              <SearchIcon className="w-6 h-6 text-black/40 mr-4 shrink-0" />
              <Input
                ref={searchInputRef}
                type="text"
                id="gallery-search-input"
                placeholder="Cari nama motif atau asal daerah..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="border-none bg-transparent h-12 text-lg md:text-xl font-bold placeholder:text-black/20 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l-2 border-black/5 shrink-0">
                <SlidersHorizontal className="w-5 h-5 text-black/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Filters</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center px-2">
            <p className="text-xs font-black uppercase tracking-widest text-black/40">
              Menampilkan {displayedItems.length} dari {filteredItems.length} hasil
            </p>
            {searchQuery && filteredItems.length === 0 && (
              <p className="text-xs font-black uppercase tracking-widest text-coral">Data tidak ditemukan</p>
            )}
          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <motion.div
                key={`${item.name}-${item.origin}`}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
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
          </AnimatePresence>
        </motion.div>
        {/* No Results State */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
          >
            <div className="bg-white neo-border p-8 rounded-4xl shadow-neo-sm rotate-3">
              <SearchIcon className="w-16 h-16 text-coral" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight">Motif Tidak Ditemukan</h3>
              <p className="text-muted-foreground font-medium max-w-md mx-auto">
                Maaf, kami belum memiliki data untuk "{searchQuery}". Tim kami terus mendigitalkan motif baru setiap harinya.
              </p>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="neo-btn bg-lime text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}
        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
            <button 
              onClick={loadMore}
              className="neo-btn bg-white text-black px-12 py-5 rounded-3xl font-black text-lg uppercase tracking-tighter hover:bg-black hover:text-white group shadow-neo-sm"
            >
              Muat Lebih Banyak
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowRight className="w-6 h-6 rotate-90 ml-2 group-hover:text-lime" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </div>
      <BatikDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        motif={selectedMotif}
      />
    </section>
  );
}