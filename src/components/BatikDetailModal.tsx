import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  if (!motif) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 neo-border neo-shadow bg-white overflow-hidden outline-none sm:rounded-2xl rounded-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] transition-all">
        <DialogHeader className="sr-only">
          <DialogTitle>{motif.name}</DialogTitle>
          <DialogDescription>
            Detail informasi mengenai motif batik {motif.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="absolute inset-0 bg-pattern-parang opacity-[0.02] pointer-events-none" />
        <div className="flex flex-col lg:flex-row min-h-0 overflow-hidden relative z-10">
          {/* Visual Section */}
          <div className="w-full lg:w-1/2 h-56 sm:h-80 lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
            <img
              src={motif.imageUrl}
              alt={motif.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-lime text-black neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] sm:text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1.5" /> {motif.origin}
              </Badge>
              {motif.confidence && (
                <Badge className="bg-coral text-white neo-border px-3 py-1 font-black shadow-neo-sm rounded-2xl text-[10px] sm:text-xs">
                  {motif.confidence}% MATCH
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white neo-border p-2 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm lg:hidden z-20 active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Detailed Content Section */}
          <div className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-black/20 min-h-0 text-left">
            <div className="hidden lg:flex justify-end mb-6">
              <button
                onClick={onClose}
                className="bg-white neo-border p-2.5 rounded-2xl hover:bg-coral hover:text-white transition-all shadow-neo-sm active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.9] text-coral">
                  {motif.name}
                </h2>
                <div className="h-2 w-24 bg-lime neo-border rounded-full" />
                <p className="text-base sm:text-lg lg:text-xl font-medium text-muted-foreground leading-relaxed">
                  {motif.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-coral">
                    <ScrollText className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
                    <h3 className="font-display font-bold text-xl md:text-2xl uppercase italic tracking-tight">Filosofi & Makna</h3>
                  </div>
                  <div className="bg-lime/5 neo-border p-6 md:p-8 rounded-2xl relative border-dashed border-black/20 group">
                    <div className="absolute inset-0 bg-pattern-batik opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
                    <p className="font-medium text-lg md:text-2xl leading-relaxed italic text-black/80 relative z-10">
                      "{motif.philosophy}"
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-black">
                    <History className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
                    <h3 className="font-display font-bold text-xl md:text-2xl uppercase italic tracking-tight">Konteks Sejarah</h3>
                  </div>
                  <div className="border-l-6 border-coral pl-6 md:pl-10 py-2">
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed font-medium">
                      {motif.history}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="p-4 bg-gray-50 neo-border rounded-2xl text-center text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-black/50 border-dashed">
                  BatikLens Cultural Archive • Preserving History with AI • 2025
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}