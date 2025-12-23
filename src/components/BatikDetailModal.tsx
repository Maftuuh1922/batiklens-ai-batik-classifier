import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, History, ScrollText, Loader2 } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
interface ModalContentProps {
  motif: {
    name: string;
    origin: string;
    imageUrl: string;
    description: string;
    philosophy: string;
    history: string;
    confidence?: number;
  } | null;
  isMobile: boolean;
}
const ModalContent = ({ motif, isMobile }: ModalContentProps) => {
  if (!motif) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-20 min-h-[400px]">
        <Loader2 className="w-12 h-12 text-coral animate-spin mb-4" />
        <p className="font-display font-bold text-muted-foreground uppercase tracking-widest text-sm text-center">
          Menyiapkan Arsip Budaya...
        </p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col lg:flex-row h-full overflow-hidden"
    >
      {/* Left Visual Section - Full height on desktop */}
      <div className="w-full lg:w-1/2 h-[45vh] sm:h-96 lg:h-full relative overflow-hidden lg:border-r-3 border-black shrink-0">
        <img
          src={motif.imageUrl}
          alt={motif.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
        <div className="absolute bottom-8 left-8 lg:top-8 lg:bottom-auto flex flex-col gap-4 z-20">
          <Badge className="bg-lime text-black neo-border px-6 py-2 font-black shadow-neo-sm rounded-3xl text-sm md:text-base">
            <MapPin className="w-5 h-5 mr-2" /> {motif.origin}
          </Badge>
          {motif.confidence && (
            <Badge className="bg-coral text-white neo-border px-6 py-2 font-black shadow-neo-sm rounded-3xl text-sm md:text-base">
              {motif.confidence}% MATCH
            </Badge>
          )}
        </div>
      </div>
      {/* Right Content Section - Spacious and highly readable */}
      <div className="flex-1 p-8 sm:p-12 lg:p-16 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-black/20 text-left bg-white bg-pattern-parang/5">
        <div className="space-y-12 md:space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85] text-coral pr-12 lg:pr-20">
              {motif.name}
            </h2>
            <div className="h-3 w-32 bg-lime neo-border rounded-full" />
            <p className="text-xl lg:text-2xl font-medium text-black/80 leading-relaxed max-w-2xl">
              {motif.description}
            </p>
          </div>
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-5 text-coral">
                <ScrollText className="w-10 h-10 stroke-[3px]" />
                <h3 className="font-display font-bold text-2xl lg:text-3xl uppercase tracking-tight underline decoration-lime decoration-6 underline-offset-8">
                  Filosofi & Makna
                </h3>
              </div>
              <div className="bg-lime/10 neo-border p-10 lg:p-14 rounded-3xl relative group overflow-hidden shadow-neo-sm hover:shadow-neo transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
                  <ScrollText size={120} />
                </div>
                <p className="font-medium text-2xl lg:text-3xl leading-relaxed italic text-black/90 relative z-10">
                  "{motif.philosophy}"
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-5 text-black">
                <History className="w-10 h-10 stroke-[3px]" />
                <h3 className="font-display font-bold text-2xl lg:text-3xl uppercase tracking-tight underline decoration-coral decoration-6 underline-offset-8">
                  Konteks Sejarah
                </h3>
              </div>
              <div className="bg-gray-50 neo-border p-10 lg:p-14 rounded-3xl shadow-neo-sm hover:shadow-neo transition-all">
                <p className="text-xl lg:text-2xl text-black/70 leading-relaxed font-medium">
                  {motif.history}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t-3 border-dashed border-black/10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-black neo-border rounded-2xl flex items-center justify-center text-[10px] font-black text-coral rotate-45 shadow-neo-sm">
                <div className="-rotate-45">BL</div>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-black/30 text-center">
                BatikLens Cultural Archive • Preserving Heritage through AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
interface BatikDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  motif: {
    name: string;
    origin: string;
    imageUrl: string;
    description: string;
    philosophy: string;
    history: string;
    confidence?: number;
  } | null;
}
export function BatikDetailModal({ isOpen, onClose, motif }: BatikDetailModalProps) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetPortal>
          <SheetOverlay className="neo-modal-overlay" />
          <SheetContent side="bottom" className="z-[1001] h-[92vh] w-full p-0 neo-border border-b-0 rounded-t-4xl bg-white overflow-hidden outline-none flex flex-col shadow-none">
            <SheetHeader className="sr-only">
              <SheetTitle>{motif?.name || "Detail Batik"}</SheetTitle>
              <SheetDescription>Informasi detail motif batik Nusantara.</SheetDescription>
            </SheetHeader>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/20 rounded-full z-[71]" />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-white neo-border p-3 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90"
              aria-label="Close sheet"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex-grow overflow-hidden">
              <AnimatePresence mode="wait">
                <ModalContent key={motif?.name || 'empty'} motif={motif} isMobile={isMobile} />
              </AnimatePresence>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="neo-modal-overlay" />
        <DialogContent
          className="z-[1001] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95vw] md:max-w-6xl lg:max-w-7xl w-full p-0 neo-border neo-shadow bg-white overflow-hidden outline-none rounded-4xl flex flex-col lg:flex-row max-h-[92vh] transition-all duration-300 shadow-neo-lg border-3 border-black"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{motif?.name || "Detail Batik"}</DialogTitle>
            <DialogDescription>Informasi detail motif batik Nusantara.</DialogDescription>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute top-8 right-8 bg-white neo-border p-4 rounded-3xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 flex items-center justify-center group"
            aria-label="Close dialog"
          >
            <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <AnimatePresence mode="wait">
            <ModalContent key={motif?.name || 'empty'} motif={motif} isMobile={isMobile} />
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}