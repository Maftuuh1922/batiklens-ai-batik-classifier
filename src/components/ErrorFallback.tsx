import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ErrorFallbackProps {
  title?: string;
  message?: string;
  statusMessage?: string;
  error?: any;
}
export function ErrorFallback({ 
  title = "Halaman Hilang", 
  message = "Motif yang Anda cari tidak dapat ditemukan di arsip kami.",
  statusMessage,
  error
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full bg-white neo-border p-8 rounded-4xl shadow-neo-lg text-center space-y-6">
        <div className="bg-lime w-20 h-20 rounded-3xl flex items-center justify-center mx-auto neo-border shadow-neo-sm rotate-3">
          <AlertCircle className="w-10 h-10 text-black" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">{title}</h1>
          <p className="text-muted-foreground font-medium">{message}</p>
          {statusMessage && (
            <p className="text-xs font-black uppercase tracking-widest text-coral mt-2">{statusMessage}</p>
          )}
        </div>
        {error && (
          <div className="text-left">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              <Terminal className="w-3 h-3" />
              Technical Details {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showDetails && (
              <div className="mt-2 p-4 bg-gray-900 rounded-2xl overflow-auto max-h-40 scrollbar-thin">
                <pre className="text-[10px] font-mono text-lime-400 whitespace-pre-wrap">
                  {error.stack || error.message || JSON.stringify(error, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
        <Button asChild className="w-full neo-btn bg-coral text-white py-6 rounded-3xl">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" /> Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}