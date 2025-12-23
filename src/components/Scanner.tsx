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
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
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
  return (
    <section id="scanner" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-28 overflow-visible">
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 opacity-10 text-coral pointer-events-none hidden md:block"
      >
        <Cloud size={160} fill="currentColor" />
      </motion.div>
      <div className="text-center mb-12 md:mb-20 space-y-4 relative z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter">UJI MOTIF ANDA</h2>
        <p className="text-base md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto px-4">
          Unggah foto kain batik untuk dianalisis oleh AI Vision kami yang didukung oleh database 600+ motif Nusantara.
        </p>
      </div>
      <div className="min-h-[500px] md:min-h-[600px] flex flex-col relative z-10">
        <NeoCard className="p-4 sm:p-8 md:p-14 flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-4xl">
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
                  className={`relative neo-border border-dashed border-black/40 p-8 sm:p-16 rounded-3xl flex flex-col items-center gap-8 md:gap-12 cursor-pointer transition-all h-full justify-center overflow-hidden flex-grow group ${
                    isDragActive ? 'bg-lime/20 border-lime shadow-neo-sm' : 'bg-gray-50 hover:bg-gray-100 hover:shadow-neo-sm'
                  }`}
                >
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.04] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-6 md:p-10 neo-border rounded-4xl relative z-10 text-white shadow-neo group-hover:-translate-y-2 transition-transform">
                    <Upload className="w-14 h-14 md:w-20 md:h-20" />
                  </div>
                  <div className="text-center relative z-10 space-y-2">
                    <p className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight">Identifikasi Pola</p>
                    <p className="text-base md:text-xl text-muted-foreground font-medium">Tarik & lepas gambar atau klik untuk memilih file</p>
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
                className="flex flex-col items-center justify-center gap-10 md:gap-16 py-12"
              >
                <div className="relative w-48 h-48 md:w-72 md:h-72 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-[8px] md:border-[12px]"
                  />
                  <div className="absolute inset-4 md:inset-8 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                    <Search className="w-14 h-14 md:w-24 md:h-24 text-black animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute inset-0 bg-lime/20 rounded-full"
                  />
                </div>
                <div className="text-center space-y-3">
                  <motion.h3
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl md:text-5xl font-display font-bold text-coral tracking-tighter uppercase"
                  >
                    Deep Scan In Progress
                  </motion.h3>
                  <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-muted-foreground uppercase font-black">Heritage Matching Engine v5.0.4</p>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-10"
              >
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
                  <div className="w-full lg:w-5/12 neo-border rounded-3xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-square lg:aspect-auto h-auto max-h-[500px]">
                    <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-8 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <h3 className="text-4xl md:text-6xl font-display font-bold text-coral tracking-tighter leading-none">{result.name}</h3>
                      <div className="bg-lime neo-border px-6 py-2 rounded-4xl font-black text-sm md:text-base shadow-neo-sm whitespace-nowrap">
                        {result.confidence}% AKURASI
                      </div>
                    </div>
                    <p className="text-lg md:text-2xl font-medium leading-relaxed text-muted-foreground">
                      {result.description}
                    </p>
                    <div className="bg-gray-50 p-6 md:p-8 neo-border rounded-3xl flex gap-6 italic text-base md:text-lg relative overflow-hidden group shadow-neo-sm">
                      <div className="absolute inset-0 bg-pattern-batik opacity-[0.03] pointer-events-none" />
                      <div className="bg-coral/20 p-3 rounded-2xl h-fit relative z-10 shrink-0 border border-coral/30">
                        <Info className="w-6 h-6 md:w-8 md:h-8 text-coral" />
                      </div>
                      <p className="leading-relaxed relative z-10"><strong>Filosofi:</strong> {result.philosophy}</p>
                    </div>
                    <div className="pt-6 flex flex-col sm:flex-row gap-6">
                      <button onClick={reset} className="neo-btn bg-black text-white px-10 py-5 rounded-3xl text-lg md:text-xl flex-1 sm:flex-none">
                        <RefreshCcw className="w-6 h-6" /> Scan Lagi
                      </button>
                      <button
                        onClick={() => setIsDetailOpen(true)}
                        className="neo-btn bg-white text-black px-10 py-5 rounded-3xl text-lg md:text-xl flex-1 sm:flex-none group"
                      >
                        Detail Lengkap <ArrowUpRight className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
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