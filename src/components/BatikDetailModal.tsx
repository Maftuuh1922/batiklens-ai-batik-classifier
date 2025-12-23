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
      <DialogContent className="max-w-4xl p-0 neo-border neo-shadow bg-white overflow-hidden outline-none sm:rounded-2xl">
        <DialogDescription className="sr-only">
          Detail informasi mengenai motif batik {motif.name}, termasuk asal usul, filosofi, dan sejarahnya.
        </DialogDescription>
        <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Visual Side */}
          <div className="w-full lg:w-1/2 h-[30vh] sm:h-[40vh] lg:h-auto relative overflow-hidden lg:border-r-3 border-black shrink-0">
            <img
              src={motif.imageUrl}
              alt={motif.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-lime text-black neo-border px-3 py-1 font-black shadow-neo-sm">
                <MapPin className="w-3 h-3 mr-1" /> {motif.origin}
              </Badge>
              {motif.confidence && (
                <Badge className="bg-coral text-black neo-border px-3 py-1 font-black shadow-neo-sm">
                  {motif.confidence}% MATCH
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white neo-border p-2 rounded-lg hover:bg-coral transition-colors shadow-neo-sm lg:hidden z-20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Content Side */}
          <div className="flex-1 p-6 lg:p-10 overflow-y-auto relative z-10 scrollbar-thin">
            <div className="hidden lg:flex justify-end mb-4">
              <button
                onClick={onClose}
                className="bg-white neo-border p-2 rounded-lg hover:bg-coral transition-colors shadow-neo-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter leading-tight mb-3">
                  {motif.name}
                </h2>
                <p className="text-base sm:text-lg font-medium text-muted-foreground leading-relaxed">
                  {motif.description}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-coral">
                  <ScrollText className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-lg sm:text-xl uppercase italic">Filosofi</h3>
                </div>
                <div className="bg-lime/10 neo-border p-5 sm:p-6 rounded-2xl relative">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-pattern-batik opacity-[0.05]" />
                  <p className="font-medium text-base sm:text-lg leading-relaxed italic">
                    "{motif.philosophy}"
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-black">
                  <History className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px]" />
                  <h3 className="font-display font-bold text-lg sm:text-xl uppercase italic">Sejarah</h3>
                </div>
                <div className="border-l-4 border-coral pl-5 sm:pl-6">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {motif.history}
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <div className="p-4 bg-gray-50 neo-border rounded-xl text-center text-[10px] font-black uppercase tracking-widest opacity-60">
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