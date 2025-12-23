import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, RefreshCcw, Info, Cloud, ArrowUpRight, Camera } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { scannerResults } from '@/lib/mockData';
import { BatikDetailModal } from './BatikDetailModal';
import { WebcamView } from './WebcamView';
import { cn } from '@/lib/utils';
type ScannerState = 'idle' | 'scanning' | 'result' | 'webcam';
export function Scanner() {
  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<typeof scannerResults[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearScanTimer = useCallback(() => {
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
  }, []);
  useEffect(() => {
    return () => clearScanTimer();
  }, [clearScanTimer]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (state !== 'idle') return;
    const file = acceptedFiles[0];
    if (file) {
      setState('scanning');
      scanTimerRef.current = setTimeout(() => {
        const randomResult = scannerResults[Math.floor(Math.random() * scannerResults.length)];
        setResult(randomResult);
        setState('result');
        scanTimerRef.current = null;
      }, 2500);
    }
  }, [state]);
  const handleCapture = useCallback((imageSrc: string) => {
    setState('scanning');
    scanTimerRef.current = setTimeout(() => {
      const randomResult = scannerResults[Math.floor(Math.random() * scannerResults.length)];
      setResult(randomResult);
      setState('result');
      scanTimerRef.current = null;
    }, 2500);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: state !== 'idle'
  });
  const reset = () => {
    clearScanTimer();
    setState('idle');
    setResult(null);
  };
  const switchMode = (newMode: ScannerState) => {
    clearScanTimer();
    setState(newMode);
    setResult(null);
  };
  return (
    <section id="scanner" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 scroll-mt-24">
      <motion.div
        animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 -left-12 text-coral opacity-[0.03] pointer-events-none hidden lg:block"
      >
        <Cloud size={200} fill="currentColor" />
      </motion.div>
      <div className="text-center mb-12 md:mb-20 space-y-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">UJI MOTIF ANDA</h2>
        <p className="text-base md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto">
          Unggah foto batik Anda untuk analisis AI Vision yang akurat berdasarkan arsip budaya Nusantara.
        </p>
      </div>
      <div className="min-h-[550px] flex flex-col relative z-10">
        {(state === 'idle' || state === 'webcam') && (
          <div className="flex flex-wrap justify-center gap-4 mb-8 z-20">
            <button
              onClick={() => switchMode('idle')}
              className={cn(
                "neo-btn px-6 py-2 rounded-2xl text-xs font-black shadow-neo-sm transition-all",
                state === 'idle' ? "bg-lime text-black" : "bg-white text-black hover:bg-lime/50"
              )}
            >
              <Upload className="w-3.5 h-3.5 mr-2" /> UPLOAD FILE
            </button>
            <button
              onClick={() => switchMode('webcam')}
              className={cn(
                "neo-btn px-6 py-2 rounded-2xl text-xs font-black shadow-neo-sm transition-all",
                state === 'webcam' ? "bg-lime text-black" : "bg-white text-black hover:bg-lime/50"
              )}
            >
              <Camera className="w-3.5 h-3.5 mr-2" /> KAMERA LANGSUNG
            </button>
          </div>
        )}
        <NeoCard className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col items-center justify-center relative overflow-hidden rounded-[32px] md:rounded-4xl shadow-neo-sm">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full h-full flex flex-col flex-grow"
              >
                <div
                  {...getRootProps()}
                  className={cn(
                    "relative neo-border border-dashed border-black/20 p-6 md:p-16 rounded-3xl flex flex-col items-center gap-6 md:gap-10 cursor-pointer transition-all h-full justify-center flex-grow group",
                    isDragActive ? 'bg-lime/10 border-lime' : 'bg-gray-50/50 hover:bg-gray-100'
                  )}
                >
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.03] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-6 md:p-8 neo-border rounded-4xl text-white shadow-neo-sm group-hover:-translate-y-2 transition-transform">
                    <Upload className="w-10 h-10 md:w-14 md:h-14" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight">Klik atau Seret Gambar</p>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">Format: JPG, PNG, HEIC (Max 10MB)</p>
                  </div>
                </div>
              </motion.div>
            )}
            {state === 'webcam' && (
              <motion.div
                key="webcam"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full min-h-[450px]"
              >
                <WebcamView onCapture={handleCapture} onClose={() => switchMode('idle')} />
              </motion.div>
            )}
            {state === 'scanning' && (
              <motion.div
                key="scanning"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 py-12"
              >
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-[8px] md:border-[12px]"
                  />
                  <div className="absolute inset-4 md:inset-8 neo-border rounded-full bg-lime/5 flex items-center justify-center">
                    <Search className="w-14 h-14 md:w-20 md:h-20 text-black animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-6 w-full max-w-xs">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-coral tracking-tighter uppercase animate-pulse">
                      Menganalisis...
                    </h3>
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase font-black">AI Heritage Core v5.1.0</p>
                  </div>
                  <div className="w-full h-4 bg-black/5 neo-border rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "linear" }}
                      className="h-full bg-lime rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch p-2"
              >
                <div className="w-full lg:w-1/2 neo-border rounded-3xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-square max-w-[400px] shrink-0">
                  <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full flex flex-col justify-center space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-coral tracking-tighter uppercase leading-none">{result.name}</h3>
                    <div className="bg-lime neo-border px-4 py-1.5 rounded-full font-black text-xs md:text-sm shadow-neo-sm self-start sm:self-center">
                      {result.confidence}% COCOK
                    </div>
                  </div>
                  <p className="text-base md:text-lg font-medium text-black/70 leading-relaxed">
                    {result.description}
                  </p>
                  <div className="bg-gray-50/80 backdrop-blur-sm p-6 neo-border rounded-3xl flex gap-4 italic relative overflow-hidden group shadow-neo-sm">
                    <div className="absolute inset-0 bg-pattern-batik opacity-[0.03] pointer-events-none" />
                    <Info className="w-6 h-6 text-coral shrink-0 mt-1" />
                    <p className="text-sm md:text-base leading-relaxed relative z-10">
                      <strong>Filosofi:</strong> {result.philosophy}
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={reset}
                      className="neo-btn bg-black text-white px-6 py-4 md:px-8 rounded-2xl text-sm md:text-base flex-1 shadow-neo-sm"
                    >
                      <RefreshCcw className="w-5 h-5 mr-2" /> Scan Ulang
                    </button>
                    <button
                      onClick={() => setIsDetailOpen(true)}
                      className="neo-btn bg-white text-black px-6 py-4 md:px-8 rounded-2xl text-sm md:text-base flex-1 group shadow-neo-sm"
                    >
                      Arsip <ArrowUpRight className="w-5 h-5 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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