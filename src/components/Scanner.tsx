import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, RefreshCcw, Info, Cloud } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { scannerResults } from '@/lib/mockData';
type ScannerState = 'idle' | 'scanning' | 'result';
export function Scanner() {
  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<typeof scannerResults[0] | null>(null);
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
    <section id="scanner" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 overflow-hidden">
      {/* Mega Mendung Decorative Clouds */}
      <motion.div 
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -left-10 opacity-10 text-coral pointer-events-none"
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 -right-10 opacity-10 text-lime pointer-events-none"
      >
        <Cloud size={160} fill="currentColor" />
      </motion.div>
      <div className="text-center mb-12 space-y-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold">UJI MOTIF ANDA</h2>
        <p className="text-lg font-medium text-muted-foreground">Unggah foto kain batik untuk dianalisis oleh AI kami.</p>
      </div>
      <div className="min-h-[500px] flex flex-col relative z-10">
        <NeoCard className="p-8 md:p-12 flex-grow flex flex-col items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full h-full"
              >
                <div
                  {...getRootProps()}
                  className={`relative neo-border border-dashed p-12 rounded-2xl flex flex-col items-center gap-6 cursor-pointer transition-colors h-full justify-center overflow-hidden ${
                    isDragActive ? 'bg-lime/20' : 'bg-gray-50'
                  }`}
                >
                  {/* Subtle Background Texture for Idle State */}
                  <div className="absolute inset-0 bg-pattern-parang opacity-[0.05] pointer-events-none" />
                  <input {...getInputProps()} />
                  <div className="bg-coral p-4 neo-border rounded-xl relative z-10">
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="text-center relative z-10">
                    <p className="text-xl font-bold">Tarik & Lepas Gambar</p>
                    <p className="text-muted-foreground">Atau klik untuk memilih file dari komputer</p>
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
                className="flex flex-col items-center gap-8 py-12"
              >
                <div className="relative w-48 h-48">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent border-[6px]"
                  />
                  <div className="absolute inset-4 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                    <Search className="w-12 h-12 text-black animate-pulse" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-lime/20 rounded-full"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-display font-bold">MENGANALISIS...</h3>
                  <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">Pixel matching algorithm active</p>
                </div>
              </motion.div>
            )}
            {state === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                  <div className="w-full md:w-2/5 neo-border rounded-xl overflow-hidden shadow-neo-sm bg-gray-100 aspect-square md:aspect-auto">
                    <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-coral">{result.name}</h3>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-lime neo-border px-4 py-1.5 rounded-full font-black text-sm shadow-neo-sm"
                      >
                        {result.confidence}% MATCH
                      </motion.div>
                    </div>
                    <p className="text-lg font-medium leading-relaxed">{result.description}</p>
                    <div className="bg-gray-50 p-5 neo-border rounded-xl flex gap-4 italic text-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-pattern-batik opacity-[0.03] pointer-events-none" />
                      <div className="bg-coral/20 p-2 rounded-lg h-fit relative z-10">
                        <Info className="w-5 h-5 text-coral" />
                      </div>
                      <p className="leading-relaxed relative z-10"><strong>Filosofi:</strong> {result.philosophy}</p>
                    </div>
                    <div className="pt-4">
                      <button onClick={reset} className="neo-btn bg-black text-white px-10 w-full md:w-auto">
                        <RefreshCcw className="w-4 h-4" /> Scan Lagi
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NeoCard>
      </div>
    </section>
  );
}