import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
export function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full bg-white neo-border p-8 rounded-4xl shadow-neo-lg text-center space-y-6">
        <div className="bg-lime w-20 h-20 rounded-3xl flex items-center justify-center mx-auto neo-border shadow-neo-sm rotate-3">
          <AlertCircle className="w-10 h-10 text-black" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-black uppercase tracking-tighter">Halaman Hilang</h1>
          <p className="text-muted-foreground font-medium">Motif yang Anda cari tidak dapat ditemukan di arsip kami.</p>
        </div>
        <Button asChild className="w-full neo-btn bg-coral text-white py-6 rounded-3xl">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" /> Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}