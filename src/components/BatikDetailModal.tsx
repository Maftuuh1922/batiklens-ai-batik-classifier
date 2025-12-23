import React, { useEffect } from 'react';
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, History, ScrollText, Loader2 } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
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
        <Loader2 className="w-10 h-10 text-coral animate-spin mb-4" />
        <p className="font-display font-bold text-muted-foreground uppercase tracking-widest text-xs">
          Memuat Arsip...
        </p>
      </div>
    );
  }
  const Wrapper = isMobile ? 'div' : motion.div;
  const wrapperProps = isMobile 
    ? { className: "w-full flex flex-col lg:flex-row h-full overflow-hidden" }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        className: "w-full flex flex-col lg:flex-row h-full overflow-hidden"
      };
  return (
    // @ts-ignore - Wrapper is either div or motion.div
    <Wrapper {...wrapperProps}>
      <div className="w-full lg:w-1/2 h-[35vh] md:h-96 lg:h-full relative overflow-hidden lg:border-r-3 border-b-3 lg:border-b-0 border-black shrink-0">
        <img
          src={motif.imageUrl}
          alt={motif.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:hidden" />
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20 items-start">
          <Badge className="bg-lime text-black neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] md:text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1.5" /> {motif.origin}
          </Badge>
          {motif.confidence && (
            <Badge className="bg-coral text-white neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] md:text-xs">
              {motif.confidence}% AKURASI
            </Badge>
          )}
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-pattern-parang pointer-events-none opacity-[0.03]" />
        <div className="flex-grow overflow-y-auto p-6 md:p-10 lg:p-12 scrollbar-thin scrollbar-thumb-black/10">
          <div className="space-y-8 md:space-y-10 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-none text-coral">
                {motif.name}
              </h2>
              <div className="h-1.5 w-20 bg-lime neo-border rounded-full" />
              <p className="text-base md:text-lg font-medium text-black/70 leading-relaxed">
                {motif.description}
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-coral">
                  <ScrollText className="w-6 h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight">Filosofi</h3>
                </div>
                <div className="bg-lime/5 neo-border p-5 md:p-7 rounded-2xl shadow-neo-sm border-lime/30 italic">
                  <p className="text-lg md:text-xl font-medium leading-relaxed">
                    "{motif.philosophy}"
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-black">
                  <History className="w-6 h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight">Sejarah</h3>
                </div>
                <div className="bg-gray-50 neo-border p-5 md:p-7 rounded-2xl shadow-neo-sm">
                  <p className="text-base md:text-lg text-black/70 leading-relaxed font-medium">
                    {motif.history}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t-2 border-dashed border-black/10 flex flex-col items-center gap-2 pb-10 lg:pb-0">
              <div className="w-8 h-8 bg-black neo-border rounded-xl flex items-center justify-center text-[8px] font-black text-coral rotate-45 shadow-neo-sm">
                <div className="-rotate-45">BL</div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/20 text-center">
                BatikLens Digital Archive
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const CloseButton = (
    <button
      onClick={onClose}
      className="absolute top-6 right-6 z-[80] bg-white neo-border p-2.5 rounded-xl hover:bg-coral hover:text-white transition-all shadow-neo-sm group active:scale-95"
      aria-label="Tutup Detail"
    >
      <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
    </button>
  );
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[85vh] h-full">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{motif?.name || "Detail Batik"}</DrawerTitle>
            <DrawerDescription>Detail Budaya Batik Nusantara</DrawerDescription>
          </DrawerHeader>
          <div className="relative flex-grow overflow-hidden flex flex-col">
            {CloseButton}
            <div className="flex-grow overflow-hidden">
              <ModalContent motif={motif} isMobile={isMobile} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="neo-modal-overlay" />
        <DialogContent
          className="z-[1001] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-5xl w-[90vw] p-0 neo-border bg-white overflow-hidden outline-none rounded-4xl flex flex-col lg:flex-row h-[80vh] shadow-neo-lg border-3 border-black [&>button:last-child]:hidden"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{motif?.name || "Detail Batik"}</DialogTitle>
            <DialogDescription>Detail Budaya Batik Nusantara</DialogDescription>
          </DialogHeader>
          {CloseButton}
          <AnimatePresence mode="wait">
            <ModalContent key={motif?.name || 'empty'} motif={motif} isMobile={isMobile} />
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}