import React from 'react';
import { Heart } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold italic">BatikLens.</h2>
            <p className="text-gray-400 font-medium max-w-xs">
              Membawa tradisi ke masa depan dengan kecerdasan buatan. Melindungi warisan budaya, satu scan setiap kalinya.
            </p>
          </div>
          <div className="flex flex-col gap-4 font-bold text-xl uppercase">
            <a href="#" className="hover:text-coral transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-coral transition-colors">Teknologi</a>
            <a href="#" className="hover:text-coral transition-colors">Kontak</a>
          </div>
          <div className="space-y-6 md:text-right">
            <div className="inline-block bg-coral text-black neo-border px-6 py-3 rounded-xl font-bold">
              DAFTAR NEWSLETTER
            </div>
            <p className="text-sm text-gray-500">
              © 2025 BatikLens Team. Dibuat dengan <Heart className="inline w-4 h-4 text-coral fill-coral" /> untuk Indonesia.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 uppercase tracking-widest">
          Meskipun proyek ini memiliki kemampuan AI, ada batasan jumlah permintaan yang dapat dilakukan ke server AI di seluruh aplikasi pengguna dalam periode waktu tertentu.
        </div>
      </div>
    </footer>
  );
}