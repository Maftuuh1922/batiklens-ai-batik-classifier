import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
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
  if (!motif) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[95vw] sm:max-w-4xl p-0 neo-border neo-shadow bg-white overflow-hidden outline-none rounded-2xl flex flex-col max-h-[92vh] transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{motif.name}</DialogTitle>
          <DialogDescription>
            Detail informasi mengenai motif batik {motif.name}.
          </DialogDescription>
        </DialogHeader>
        {/* Unified Close Button - Fixed position for all viewports */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white neo-border p-2 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm z-[70] active:scale-90 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="absolute inset-0 bg-pattern-parang opacity-[0.02] pointer-events-none" />
        <div className="flex flex-col lg:flex-row min-h-0 overflow-hidden relative z-10 w-full">
          {/* Visual Section */}
          <div className="w-full lg:w-1/2 h-48 sm:h-72 lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
            <img
              src={motif.imageUrl}
              alt={motif.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
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
          {/* Detailed Content Section */}
          <div className="flex-1 p-5 sm:p-8 lg:p-12 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-black/20 min-h-0 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 sm:space-y-10"
            >
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.95] text-coral pr-10">
                  {motif.name}
                </h2>
                <div className="h-1.5 w-16 bg-lime neo-border rounded-full" />
                <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground leading-relaxed">
                  {motif.description}
                </p>
              </div>
              <div className="space-y-6 sm:space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-coral">
                    <ScrollText className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3px]" />
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase italic tracking-tight">Filosofi & Makna</h3>
                  </div>
                  <div className="bg-lime/5 neo-border p-5 sm:p-7 rounded-2xl relative border-dashed border-black/20 group overflow-hidden">
                    <div className="absolute inset-0 bg-pattern-batik opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
                    <p className="font-medium text-base sm:text-xl lg:text-2xl leading-relaxed italic text-black/80 relative z-10">
                      "{motif.philosophy}"
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-black">
                    <History className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3px]" />
                    <h3 className="font-display font-bold text-lg sm:text-xl uppercase italic tracking-tight">Konteks Sejarah</h3>
                  </div>
                  <div className="border-l-4 sm:border-l-6 border-coral pl-4 sm:pl-8 py-1">
                    <p className="text-xs sm:text-base text-muted-foreground leading-relaxed font-medium">
                      {motif.history}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 sm:pt-10">
                <div className="p-3 bg-gray-50 neo-border rounded-xl text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-black/40 border-dashed text-center">
                  BatikLens Cultural Archive • 2025
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}