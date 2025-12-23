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
      <DialogContent className="max-w-4xl p-0 neo-border neo-shadow bg-white overflow-hidden outline-none sm:rounded-2xl rounded-2xl flex flex-col max-h-[95vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{motif.name}</DialogTitle>
          <DialogDescription>
            Detail informasi mengenai motif batik {motif.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
        <div className="flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* Visual Side */}
          <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
            <img
              src={motif.imageUrl}
              alt={motif.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className="bg-lime text-black neo-border px-2 py-0.5 md:px-3 md:py-1 font-black shadow-neo-sm rounded-2xl text-[10px] md:text-xs">
                <MapPin className="w-3 h-3 mr-1" /> {motif.origin}
              </Badge>
              {motif.confidence && (
                <Badge className="bg-coral text-white neo-border px-2 py-0.5 md:px-3 md:py-1 font-black shadow-neo-sm rounded-2xl text-[10px] md:text-xs">
                  {motif.confidence}% MATCH
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-white neo-border p-1.5 rounded-2xl hover:bg-coral hover:text-white transition-colors shadow-neo-sm lg:hidden z-20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Content Side */}
          <div className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto relative z-10 scrollbar-thin min-h-0">
            <div className="hidden lg:flex justify-end mb-4">
              <button
                onClick={onClose}
                className="bg-white neo-border p-2 rounded-2xl hover:bg-coral hover:text-white transition-colors shadow-neo-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold uppercase tracking-tighter leading-tight mb-2 md:mb-3 text-coral">
                  {motif.name}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground leading-relaxed">
                  {motif.description}
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-coral">
                  <ScrollText className="w-4 h-4 md:w-6 md:h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-base md:text-xl uppercase italic">Filosofi</h3>
                </div>
                <div className="bg-lime/10 neo-border p-4 md:p-6 rounded-2xl relative">
                  <p className="font-medium text-sm md:text-lg leading-relaxed italic">
                    "{motif.philosophy}"
                  </p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-black">
                  <History className="w-4 h-4 md:w-6 md:h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-base md:text-xl uppercase italic">Sejarah</h3>
                </div>
                <div className="border-l-4 border-coral pl-4 md:pl-6">
                  <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                    {motif.history}
                  </p>
                </div>
              </div>
              <div className="pt-4 md:pt-6">
                <div className="p-3 bg-gray-50 neo-border rounded-2xl text-center text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60">
                  BatikLens Cultural Heritage Archive • 2025
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}