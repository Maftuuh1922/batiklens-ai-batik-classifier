import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, RefreshCcw, Info, Cloud, ArrowUpRight } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { scannerResults } from '@/lib/mockData';
import { BatikDetailModal } from './BatikDetailModal';
type ScannerState = 'idle' | 'scanning' | 'result';
export function Scanner() {
  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<typeof scannerResults[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setState('scanning');
      setTimeout(() => {
        const randomResult = scannerResults[Math.floor(Math.random() * scannerResults.length)];
        setResult(randomResult);
        setState('result');
      }, 3000);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });
  const reset = () => {
    setState('idle');
    setResult(null);
  };
  return (
    <section id="scanner" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-24 overflow-hidden">
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 opacity-10 text-coral pointer-events-none"
      >
        <Cloud size={80} fill="currentColor" className="md:w-32 md:h-32" />
      </motion.div>
      <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">UJI MOTIF ANDA</h2>
        <p className="text-base md:text-lg font-medium text-muted-foreground px-4">Unggah foto kain batik untuk dianalisis oleh AI kami.</p>
      </div>
      <div className="min-h-[400px] md:min-h-[500px] flex flex-col relative z-10">
        <NeoCard className="p-4 sm:p-8 md:p-12 flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full h-full flex flex-col"
              >
                <div
                  {...getRootProps()}
                  className={`relative neo-border border-dashed p-6 sm:p-12 rounded-2xl flex flex-col items-center gap-4 md:gap-6 cursor-pointer transition-colors h-full justify-center overflow-hidden flex-grow ${
                    isDragActive ? 'bg-lime/20' : 'bg-gray-50'
                  }`}
                >
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.05] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-3 md:p-4 neo-border rounded-2xl relative z-10 text-white">
                    <Upload className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="text-center relative z-10">
                    <p className="text-lg md:text-xl font-bold">Tarik & Lepas Gambar</p>
                    <p className="text-sm md:text-base text-muted-foreground">Atau klik untuk memilih file</p>
                  </div>
                </div>
              </motion.div>
            )}
            {state === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6 md:gap-8 py-8 md:py-12"
              >
                <div className="relative w-32 h-32 md:w-48 md:h-48">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-4 md:border-[6px]"
                  />
                  <div className="absolute inset-2 md:inset-4 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                    <Search className="w-8 h-8 md:w-12 md:h-12 text-black animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-lime/20 rounded-full"
                  />
                </div>
                <div className="text-center space-y-1 md:space-y-2">
                  <motion.h3
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xl md:text-2xl font-display font-bold text-coral"
                  >
                    MENGANALISIS...
                  </motion.h3>
                  <p className="font-mono text-[10px] md:text-sm tracking-widest text-muted-foreground uppercase">Pixel matching active</p>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-6 md:space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                  <div className="w-full md:w-2/5 neo-border rounded-2xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-video md:aspect-auto">
                    <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-coral">{result.name}</h3>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-lime neo-border px-3 py-1 md:px-4 md:py-1.5 rounded-full font-black text-[10px] md:text-sm shadow-neo-sm"
                      >
                        {result.confidence}% MATCH
                      </motion.div>
                    </div>
                    <p className="text-sm md:text-lg font-medium leading-relaxed text-left">{result.description}</p>
                    <div className="bg-gray-50 p-4 md:p-5 neo-border rounded-2xl flex gap-3 md:gap-4 italic text-xs md:text-sm relative overflow-hidden text-left">
                      <div className="absolute inset-0 bg-pattern-batik opacity-[0.03] pointer-events-none" />
                      <div className="bg-coral/20 p-1.5 md:p-2 rounded-2xl h-fit relative z-10 shrink-0">
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-coral" />
                      </div>
                      <p className="leading-relaxed relative z-10"><strong>Filosofi:</strong> {result.philosophy}</p>
                    </div>
                    <div className="pt-2 md:pt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                      <button onClick={reset} className="neo-btn bg-black text-white px-6 md:px-8 w-full sm:w-auto rounded-2xl text-sm md:text-base">
                        <RefreshCcw className="w-4 h-4" /> Scan Lagi
                      </button>
                      <button
                        onClick={() => setIsDetailOpen(true)}
                        className="neo-btn bg-white text-black px-6 md:px-8 w-full sm:w-auto rounded-2xl text-sm md:text-base"
                      >
                        Detail Lengkap <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NeoCard>
      </div>
      <BatikDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        motif={result}
      />
    </section>
  );
}