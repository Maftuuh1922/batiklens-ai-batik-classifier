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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { X, MapPin, History, ScrollText } from "lucide-react";
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
  if (!motif && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay className="neo-modal-overlay" />
          <DialogContent className="z-[1001] max-w-[95vw] sm:max-w-xl p-8 neo-border neo-shadow bg-white rounded-2xl flex items-center justify-center min-h-[200px]">
            <div className="text-center font-display font-bold animate-pulse text-muted-foreground uppercase tracking-widest">
              Memuat Data...
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
  if (!motif) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="neo-modal-overlay" />
        <DialogContent
          className="z-[1001] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95vw] sm:max-w-4xl w-full p-0 neo-border neo-shadow bg-white overflow-hidden outline-none rounded-2xl flex flex-col lg:flex-row max-h-[90vh] transition-all duration-300"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{motif.name}</DialogTitle>
            <DialogDescription>
              Detail informasi mengenai motif batik {motif.name}.
            </DialogDescription>
          </DialogHeader>
          {/* Persistent Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white neo-border p-2 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 group flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* Subtly patterned background across entire modal */}
          <div className="absolute inset-0 bg-pattern-parang opacity-[0.015] pointer-events-none" />
          {/* Left Visual Section (Desktop) / Top Visual Section (Mobile) */}
          <div className="w-full lg:w-1/2 h-56 sm:h-80 lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
            <img
              src={motif.imageUrl}
              alt={motif.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 lg:top-4 lg:bottom-auto flex flex-col gap-2 z-20">
              <Badge className="bg-lime text-black neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] sm:text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1.5" /> {motif.origin}
              </Badge>
              {motif.confidence && (
                <Badge className="bg-coral text-white neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] sm:text-xs">
                  {motif.confidence}% MATCH
                </Badge>
              )}
            </div>
          </div>
          {/* Right Content Section (Desktop) / Bottom Content Section (Mobile) */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-black/20 text-left bg-white">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 sm:space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter leading-none text-coral pr-10">
                  {motif.name}
                </h2>
                <div className="h-1.5 w-20 bg-lime neo-border rounded-full" />
                <p className="text-sm sm:text-base lg:text-lg font-medium text-black/80 leading-relaxed">
                  {motif.description}
                </p>
              </div>
              <div className="space-y-8">
                {/* Philosophy Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-coral">
                    <ScrollText className="w-6 h-6 stroke-[3px]" />
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight">Filosofi & Makna</h3>
                  </div>
                  <div className="bg-lime/10 neo-border p-6 rounded-2xl relative group overflow-hidden shadow-neo-sm">
                    <p className="font-medium text-base sm:text-lg lg:text-xl leading-relaxed italic text-black/90 relative z-10">
                      "{motif.philosophy}"
                    </p>
                  </div>
                </div>
                {/* History Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-black">
                    <History className="w-6 h-6 stroke-[3px]" />
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight">Konteks Sejarah</h3>
                  </div>
                  <div className="bg-gray-50 neo-border p-6 rounded-2xl shadow-neo-sm">
                    <p className="text-sm sm:text-base text-black/70 leading-relaxed font-medium">
                      {motif.history}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t-2 border-dashed border-black/10">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-black/30 text-center">
                  BatikLens Cultural Archive • Preserving Heritage through AI
                </p>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}