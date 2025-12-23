import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  // Ref to track the scanning timer for cleanup
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
    };
  }, []);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Clear any existing active timer before starting a new one
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
      setState('scanning');
      scanTimerRef.current = setTimeout(() => {
        try {
          const randomResult = scannerResults[Math.floor(Math.random() * scannerResults.length)];
          setResult(randomResult);
          setState('result');
        } catch (err) {
          console.error("Scanning simulation failed:", err);
          setState('idle');
        } finally {
          scanTimerRef.current = null;
        }
      }, 3000);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });
  const reset = () => {
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    setState('idle');
    setResult(null);
  };
  const openDetailedInfo = () => {
    if (result) {
      setIsDetailOpen(true);
    }
  };
  return (
    <section id="scanner" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24 overflow-visible">
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 opacity-10 text-coral pointer-events-none hidden md:block"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      <div className="text-center mb-10 md:mb-16 space-y-3 relative z-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight">UJI MOTIF ANDA</h2>
        <p className="text-sm md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto px-4">
          Unggah foto kain batik untuk dianalisis oleh AI kami. Pastikan pencahayaan cukup untuk hasil terbaik.
        </p>
      </div>
      <div className="min-h-[450px] md:min-h-[550px] flex flex-col relative z-10">
        <NeoCard className="p-4 sm:p-8 md:p-12 flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full h-full flex flex-col"
              >
                <div
                  {...getRootProps()}
                  className={`relative neo-border border-dashed border-black/40 p-6 sm:p-12 rounded-2xl flex flex-col items-center gap-6 md:gap-8 cursor-pointer transition-all h-full justify-center overflow-hidden flex-grow group ${
                    isDragActive ? 'bg-lime/20 border-lime' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-4 md:p-6 neo-border rounded-2xl relative z-10 text-white shadow-neo-sm group-hover:-translate-y-1 transition-transform">
                    <Upload className="w-10 h-10 md:w-14 md:h-14" />
                  </div>
                  <div className="text-center relative z-10 space-y-1">
                    <p className="text-xl md:text-2xl font-display font-bold">Tarik & Lepas Gambar</p>
                    <p className="text-sm md:text-lg text-muted-foreground font-medium">Atau klik untuk menelusuri galeri Anda</p>
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
                className="flex flex-col items-center justify-center gap-8 md:gap-12 py-10"
              >
                <div className="relative w-36 h-36 md:w-56 md:h-56 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-[6px] md:border-[8px]"
                  />
                  <div className="absolute inset-3 md:inset-5 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                    <Search className="w-10 h-10 md:w-16 md:h-16 text-black animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-lime/20 rounded-full"
                  />
                </div>
                <div className="text-center space-y-2">
                  <motion.h3
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl md:text-4xl font-display font-bold text-coral tracking-tighter"
                  >
                    MENGANALISIS...
                  </motion.h3>
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase font-bold">Neural Pattern Matching V4.0</p>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-8"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                  <div className="w-full lg:w-5/12 neo-border rounded-2xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-square lg:aspect-auto h-auto max-h-[400px]">
                    <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-5 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-3xl md:text-5xl font-display font-bold text-coral tracking-tighter">{result.name}</h3>
                      <div className="bg-lime neo-border px-4 py-1.5 rounded-full font-black text-xs md:text-sm shadow-neo-sm">
                        {result.confidence}% MATCH
                      </div>
                    </div>
                    <p className="text-base md:text-xl font-medium leading-relaxed text-muted-foreground">
                      {result.description}
                    </p>
                    <div className="bg-gray-50 p-5 md:p-6 neo-border rounded-2xl flex gap-4 italic text-sm md:text-base relative overflow-hidden group">
                      <div className="absolute inset-0 bg-pattern-batik opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity" />
                      <div className="bg-coral/20 p-2 rounded-2xl h-fit relative z-10 shrink-0 border border-coral/30">
                        <Info className="w-5 h-5 md:w-6 md:h-6 text-coral" />
                      </div>
                      <p className="leading-relaxed relative z-10"><strong>Filosofi:</strong> {result.philosophy}</p>
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button onClick={reset} className="neo-btn bg-black text-white px-8 py-4 rounded-2xl text-base md:text-lg flex-1 sm:flex-none">
                        <RefreshCcw className="w-5 h-5" /> Scan Lagi
                      </button>
                      <button
                        onClick={openDetailedInfo}
                        className="neo-btn bg-white text-black px-8 py-4 rounded-2xl text-base md:text-lg flex-1 sm:flex-none group"
                      >
                        Detail Lengkap <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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