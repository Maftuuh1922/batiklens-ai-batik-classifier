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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full flex flex-col lg:flex-row h-full overflow-hidden"
    >
      {/* Left/Top Visual Section */}
      <div className="w-full lg:w-1/2 h-[40vh] sm:h-80 lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
        <img
          src={motif.imageUrl}
          alt={motif.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
        <div className="absolute bottom-6 left-6 lg:top-6 lg:bottom-auto flex flex-col gap-3 z-20">
          <Badge className="bg-lime text-black neo-border px-4 py-1.5 font-black shadow-neo-sm rounded-3xl text-xs sm:text-sm">
            <MapPin className="w-4 h-4 mr-2" /> {motif.origin}
          </Badge>
          {motif.confidence && (
            <Badge className="bg-coral text-white neo-border px-4 py-1.5 font-black shadow-neo-sm rounded-3xl text-xs sm:text-sm">
              {motif.confidence}% MATCH
            </Badge>
          )}
        </div>
      </div>
      {/* Right/Bottom Content Section */}
      <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-black/20 text-left bg-white bg-pattern-parang/5">
        <div className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.9] text-coral pr-10">
              {motif.name}
            </h2>
            <div className="h-2 w-24 bg-lime neo-border rounded-full" />
            <p className="text-lg lg:text-xl font-medium text-black/80 leading-[1.6]">
              {motif.description}
            </p>
          </div>
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-coral">
                <ScrollText className="w-8 h-8 stroke-[3px]" />
                <h3 className="font-display font-bold text-xl uppercase tracking-tight underline decoration-lime decoration-4 underline-offset-4">Filosofi & Makna</h3>
              </div>
              <div className="bg-lime/10 neo-border p-8 rounded-3xl relative group overflow-hidden shadow-neo-sm">
                <p className="font-medium text-xl lg:text-2xl leading-[1.6] italic text-black/90 relative z-10">
                  "{motif.philosophy}"
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-black">
                <History className="w-8 h-8 stroke-[3px]" />
                <h3 className="font-display font-bold text-xl uppercase tracking-tight underline decoration-coral decoration-4 underline-offset-4">Konteks Sejarah</h3>
              </div>
              <div className="bg-gray-50 neo-border p-8 rounded-3xl shadow-neo-sm">
                <p className="text-lg text-black/70 leading-[1.6] font-medium">
                  {motif.history}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t-3 border-dashed border-black/10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-black/30 text-center">
              BatikLens Cultural Archive • Preserving Heritage through AI
            </p>
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
          <SheetContent side="bottom" className="z-[1001] h-[90vh] w-[100vw] p-0 neo-border border-b-0 rounded-t-4xl bg-white overflow-hidden outline-none flex flex-col shadow-none">
            <SheetHeader className="sr-only">
              <SheetTitle>{motif?.name || "Detail Batik"}</SheetTitle>
              <SheetDescription>Informasi detail motif batik.</SheetDescription>
            </SheetHeader>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/10 rounded-full z-[71]" />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 bg-white neo-border p-2.5 rounded-3xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90"
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
          className="z-[1001] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95vw] sm:max-w-6xl w-full p-0 neo-border neo-shadow bg-white overflow-hidden outline-none rounded-4xl flex flex-col lg:flex-row max-h-[90vh] transition-all duration-300 shadow-neo-lg"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{motif?.name || "Detail Batik"}</DialogTitle>
            <DialogDescription>Informasi detail motif batik.</DialogDescription>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white neo-border p-3 rounded-3xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
          <AnimatePresence mode="wait">
            <ModalContent key={motif?.name || 'empty'} motif={motif} isMobile={isMobile} />
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}