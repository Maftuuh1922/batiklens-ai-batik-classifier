import React from 'react';
import { Heart } from 'lucide-react';
export function Footer() {
  return (
    <footer className="relative bg-black text-white py-16 border-t-3 border-black overflow-hidden">
      {/* Semi-transparent Batik Overlay */}
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.08] grayscale invert pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold italic text-coral">BatikLens.</h2>
            <p className="text-gray-400 font-medium max-w-xs mx-auto md:mx-0">
              Membawa tradisi ke masa depan dengan kecerdasan buatan. Melindungi warisan budaya, satu scan setiap kalinya.
            </p>
          </div>
          <div className="flex flex-col gap-4 font-bold text-xl uppercase">
            <a href="#" className="hover:text-coral transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-coral transition-colors">Teknologi</a>
            <a href="#" className="hover:text-coral transition-colors">Kontak</a>
          </div>
          <div className="space-y-6 md:text-right">
            <div className="inline-block bg-coral text-white neo-border px-6 py-3 rounded-2xl font-bold hover:shadow-neo-sm transition-all cursor-pointer">
              DAFTAR NEWSLETTER
            </div>
            <p className="text-sm text-gray-500">
              © 2025 BatikLens Team. Dibuat dengan <Heart className="inline w-4 h-4 text-coral fill-coral" /> untuk Indonesia.
            </p>
          </div>
        </div>
        {/* Decorative Batik Divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black neo-border rounded-full flex items-center justify-center text-[10px] font-bold text-coral">
            BL
          </div>
        </div>
        <div className="mt-8 pt-8 text-center text-xs text-gray-500 uppercase tracking-widest max-w-2xl mx-auto">
          Meskipun proyek ini memiliki kemampuan AI, ada batasan jumlah permintaan yang dapat dilakukan ke server AI di seluruh aplikasi pengguna dalam periode waktu tertentu.
        </div>
      </div>
    </footer>
  );
}