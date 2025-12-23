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
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-coral animate-spin mb-4" />
          <div className="absolute inset-0 bg-coral/5 rounded-full animate-ping -z-10" />
        </div>
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
      className="w-full flex flex-col lg:flex-row h-full overflow-hidden overscroll-behavior-contain"
    >
      <div className="w-full lg:w-1/2 h-[40vh] sm:h-80 lg:h-full relative overflow-hidden lg:border-r-3 border-b-3 lg:border-b-0 border-black shrink-0 lg:rounded-l-4xl">
        <img
          src={motif.imageUrl}
          alt={`Visual detail motif batik ${motif.name}`}
          className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
        <div className="absolute bottom-6 left-6 lg:top-8 lg:bottom-auto flex flex-col gap-3 z-20">
          <Badge className="bg-lime text-black neo-border px-4 py-1.5 font-black shadow-neo-sm rounded-3xl text-xs md:text-sm">
            <MapPin className="w-4 h-4 mr-2" aria-hidden="true" /> {motif.origin}
          </Badge>
          {motif.confidence && (
            <Badge className="bg-coral text-white neo-border px-4 py-1.5 font-black shadow-neo-sm rounded-3xl text-xs md:text-sm">
              {motif.confidence}% MATCH
            </Badge>
          )}
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-pattern-parang pointer-events-none" />
        <div className="flex-grow overflow-y-auto p-6 md:p-8 lg:p-12 scrollbar-thin scrollbar-thumb-black/20 overscroll-contain">
          <div className="space-y-10 md:space-y-12 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-[0.9] text-coral pr-12 lg:pr-16 break-words whitespace-normal">
                {motif.name}
              </h2>
              <div className="h-2 w-24 bg-lime neo-border rounded-full" />
              <p className="text-lg lg:text-xl font-medium text-black/80 leading-relaxed">
                {motif.description}
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-coral">
                  <ScrollText className="w-8 h-8 stroke-[3px]" aria-hidden="true" />
                  <h3 className="font-display font-bold text-xl lg:text-2xl uppercase tracking-tight underline decoration-lime decoration-4 underline-offset-4">
                    Filosofi & Makna
                  </h3>
                </div>
                <div className="bg-lime/10 neo-border p-6 lg:p-8 rounded-3xl relative group overflow-hidden shadow-neo-sm hover:shadow-neo transition-all">
                  <div className="absolute top-0 right-0 p-3 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-500">
                    <ScrollText size={80} aria-hidden="true" />
                  </div>
                  <p className="font-medium text-xl lg:text-2xl leading-relaxed italic text-black/90 relative z-10">
                    "{motif.philosophy}"
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-black">
                  <History className="w-8 h-8 stroke-[3px]" aria-hidden="true" />
                  <h3 className="font-display font-bold text-xl lg:text-2xl uppercase tracking-tight underline decoration-coral decoration-4 underline-offset-4">
                    Konteks Sejarah
                  </h3>
                </div>
                <div className="bg-gray-50 neo-border p-6 lg:p-8 rounded-3xl shadow-neo-sm hover:shadow-neo transition-all">
                  <p className="text-lg lg:text-xl text-black/70 leading-relaxed font-medium">
                    {motif.history}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-10 border-t-3 border-dashed border-black/10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-black neo-border rounded-2xl flex items-center justify-center text-[9px] font-black text-coral rotate-45 shadow-neo-sm">
                  <div className="-rotate-45" aria-hidden="true">BL</div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 text-center">
                  BatikLens Cultural Archive • Preserving Heritage through AI
                </p>
              </div>
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
          <SheetContent side="bottom" className="z-[1001] h-[92vh] w-full p-0 neo-border border-b-0 rounded-t-4xl bg-white overflow-hidden outline-none flex flex-col shadow-none focus:ring-0">
            <SheetHeader className="sr-only">
              <SheetTitle>{motif?.name || "Detail Batik"}</SheetTitle>
              <SheetDescription>Informasi detail motif batik Nusantara.</SheetDescription>
            </SheetHeader>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black/20 rounded-full z-[71]" />
            <button
              onClick={onClose}
              className="absolute top-5 right-5 bg-white neo-border p-2.5 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 outline-none focus:ring-0"
              aria-label="Tutup detail"
            >
              <X className="w-5 h-5" />
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
          className="z-[1001] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95vw] lg:max-w-6xl w-full p-0 neo-border bg-white overflow-hidden outline-none rounded-4xl flex flex-col lg:flex-row h-[85vh] transition-all duration-300 shadow-neo-lg border-3 border-black focus:ring-0"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{motif?.name || "Detail Batik"}</DialogTitle>
            <DialogDescription>Informasi detail motif batik Nusantara.</DialogDescription>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white neo-border p-3 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 flex items-center justify-center group outline-none focus:ring-0"
            aria-label="Tutup detail"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <AnimatePresence mode="wait">
            <ModalContent key={motif?.name || 'empty'} motif={motif} isMobile={isMobile} />
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}