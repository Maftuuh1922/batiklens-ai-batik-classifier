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
    if (state !== 'idle') return;
    const file = acceptedFiles[0];
    if (file) {
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
  }, [state]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: state !== 'idle'
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
    <section id="scanner" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 overflow-visible scroll-mt-24">
      <div aria-live="polite" className="sr-only">
        {state === 'idle' && "Scanner is ready to upload."}
        {state === 'scanning' && "Analyzing the uploaded batik motif..."}
        {state === 'result' && `Identification complete. Result: ${result?.name}.`}
      </div>
      <motion.div
        animate={{ x: [-15, 15, -15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 opacity-10 text-coral pointer-events-none hidden lg:block"
      >
        <Cloud size={160} fill="currentColor" />
      </motion.div>
      <div className="text-center mb-10 md:mb-16 space-y-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">UJI MOTIF ANDA</h2>
        <p className="text-base md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto px-4">
          Unggah foto kain batik untuk dianalisis oleh AI Vision kami yang didukung oleh database 600+ motif Nusantara.
        </p>
      </div>
      <div className="min-h-[500px] md:min-h-[600px] flex flex-col relative z-10">
        <NeoCard className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-4xl">
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
                  className={`relative neo-border border-dashed border-black/30 p-8 md:p-12 rounded-3xl flex flex-col items-center gap-8 md:gap-10 cursor-pointer transition-all h-full justify-center overflow-hidden flex-grow group ${
                    isDragActive ? 'bg-lime/20 border-lime shadow-neo-sm' : 'bg-gray-50 hover:bg-gray-100 hover:shadow-neo-sm'
                  }`}
                >
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-5 md:p-8 neo-border rounded-4xl relative z-10 text-white shadow-neo group-hover:-translate-y-2 transition-transform">
                    <Upload className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
                  <div className="text-center relative z-10 space-y-2">
                    <p className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight">Identifikasi Pola</p>
                    <p className="text-sm md:text-lg text-muted-foreground font-medium">Tarik & lepas gambar atau klik untuk memilih file</p>
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
                className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 py-12"
              >
                <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-[6px] md:border-[10px]"
                  />
                  <div className="absolute inset-3 md:inset-6 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                    <Search className="w-12 h-12 md:w-20 md:h-20 text-black animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute inset-0 bg-lime/20 rounded-full"
                  />
                </div>
                <div className="text-center space-y-2">
                  <motion.h3
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl md:text-4xl font-display font-bold text-coral tracking-tighter uppercase"
                  >
                    Deep Scan In Progress
                  </motion.h3>
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase font-black">Heritage Matching Engine v5.0.4</p>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch justify-center p-2"
              >
                <div className="w-full lg:w-1/2 neo-border rounded-3xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-square max-w-[450px] shrink-0">
                  <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full flex flex-col justify-center space-y-6 text-left p-2 lg:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-coral tracking-tighter leading-none uppercase">{result.name}</h3>
                    <div className="bg-lime neo-border px-4 py-1.5 rounded-4xl font-black text-xs md:text-sm shadow-neo-sm whitespace-nowrap self-start sm:self-center">
                      {result.confidence}% MATCH
                    </div>
                  </div>
                  <p className="text-base md:text-xl font-medium leading-relaxed text-muted-foreground">
                    {result.description}
                  </p>
                  <div className="bg-gray-50 p-6 md:p-8 neo-border rounded-3xl flex gap-4 italic text-sm md:text-base relative overflow-hidden group shadow-neo-sm">
                    <div className="absolute inset-0 bg-pattern-batik opacity-[0.02] pointer-events-none" />
                    <div className="bg-coral/10 p-2 rounded-xl h-fit relative z-10 shrink-0 border border-coral/20">
                      <Info className="w-5 h-5 md:w-6 md:h-6 text-coral" />
                    </div>
                    <p className="leading-relaxed relative z-10"><strong>Filosofi:</strong> {result.philosophy}</p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button onClick={reset} className="neo-btn bg-black text-white px-8 py-4 rounded-3xl text-base md:text-lg flex-1 sm:flex-none">
                      <RefreshCcw className="w-5 h-5 mr-2" /> Scan Lagi
                    </button>
                    <button
                      onClick={() => setIsDetailOpen(true)}
                      className="neo-btn bg-white text-black px-8 py-4 rounded-3xl text-base md:text-lg flex-1 sm:flex-none group"
                    >
                      Detail Lengkap <ArrowUpRight className="w-5 h-5 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
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