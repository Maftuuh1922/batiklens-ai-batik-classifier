import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, CheckCircle, RefreshCcw, Info } from 'lucide-react';
import { NeoCard } from './ui/NeoCard';
import { scannerResults } from '@/lib/mockData';
type ScannerState = 'idle' | 'scanning' | 'result';
export function Scanner() {
  const [state, setState] = useState<ScannerState>('idle');
  const [result, setResult] = useState<typeof scannerResults[0] | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setState('scanning');
      // Simulate scanning delay
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
    <section id="scanner" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-5xl font-display font-bold">UJI MOTIF ANDA</h2>
        <p className="text-lg font-medium text-muted-foreground">Unggah foto kain batik untuk dianalisis oleh AI kami.</p>
      </div>
      <NeoCard className="p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <div 
                {...getRootProps()} 
                className={`neo-border border-dashed p-12 rounded-2xl flex flex-col items-center gap-6 cursor-pointer transition-colors ${isDragActive ? 'bg-lime/20' : 'bg-gray-50'}`}
              >
                <input {...getInputProps()} />
                <div className="bg-coral p-4 neo-border rounded-xl">
                  <Upload className="w-10 h-10" />
                </div>
                <div className="text-center">
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
                  className="absolute inset-0 neo-border rounded-full border-lime border-t-transparent"
                />
                <div className="absolute inset-4 neo-border rounded-full bg-lime/10 flex items-center justify-center">
                  <Search className="w-12 h-12 text-black animate-pulse" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-lime/20 rounded-full"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-display font-bold">MENGANALISIS...</h3>
                <p className="font-mono text-sm">MATCHING PATTERNS: 84% COMPLETE</p>
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
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 neo-border rounded-xl overflow-hidden shadow-neo-sm">
                  <img src={result.imageUrl} alt={result.name} className="w-full h-48 object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-display font-bold text-coral">{result.name}</h3>
                    <div className="bg-lime neo-border px-3 py-1 rounded font-bold text-sm">
                      {result.confidence}% MATCH
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-relaxed">{result.description}</p>
                  <div className="bg-gray-100 p-4 neo-border rounded-lg flex gap-3 italic text-sm">
                    <Info className="w-5 h-5 flex-shrink-0 text-coral" />
                    <p><strong>Filosofi:</strong> {result.philosophy}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <button onClick={reset} className="neo-btn bg-black text-white px-8">
                  <RefreshCcw className="w-4 h-4" /> Scan Lagi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </NeoCard>
    </section>
  );
}