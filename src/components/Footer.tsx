import React from 'react';
import { Heart, Globe, Github, Instagram, ArrowUp } from 'lucide-react';
export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="relative bg-black text-white py-16 md:py-24 border-t-4 border-black overflow-hidden mt-12">
      {/* Semi-transparent Batik Overlay */}
      <div className="absolute inset-0 bg-pattern-batik opacity-[0.06] grayscale invert pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold italic text-coral leading-none tracking-tighter">BatikLens.</h2>
            <p className="text-gray-400 font-bold text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
              Menjembatani tradisi adiluhung dengan masa depan digital. Melindungi identitas budaya melalui kecerdasan buatan, satu helai kain setiap kalinya.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {[Instagram, Github, Globe].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-white/5 neo-border rounded-xl hover:bg-coral hover:text-white transition-all shadow-neo-sm active:scale-90">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold uppercase tracking-widest text-lime underline decoration-2 underline-offset-8">Navigasi</h3>
            <div className="flex flex-col gap-4 font-bold text-lg md:text-xl uppercase tracking-tighter">
              <a href="#hero" className="hover:text-coral transition-all hover:translate-x-2">Beranda</a>
              <a href="#scanner" className="hover:text-coral transition-all hover:translate-x-2">AI Scanner</a>
              <a href="#gallery" className="hover:text-coral transition-all hover:translate-x-2">Katalog Motif</a>
              <a href="#" className="hover:text-coral transition-all hover:translate-x-2">Tentang Kami</a>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl font-display font-bold uppercase tracking-widest text-lime underline decoration-2 underline-offset-8">Update</h3>
            <div className="space-y-4">
              <div className="bg-white/5 neo-border p-5 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all shadow-neo-sm active:scale-95">
                <p className="text-xs font-black text-coral uppercase tracking-widest mb-1">E-Newsletter</p>
                <p className="text-sm font-bold">Daftar untuk update database motif terbaru.</p>
              </div>
              <button 
                onClick={scrollToTop}
                className="w-full neo-btn bg-coral text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black shadow-neo-sm hover:shadow-neo transition-all"
              >
                KEMBALI KE ATAS <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Decorative Batik Divider */}
        <div className="mt-20 mb-12 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black neo-border rounded-2xl flex items-center justify-center text-xs font-black text-coral shadow-neo-sm rotate-45">
            <div className="-rotate-45">BL</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            © 2025 BatikLens Team. Crafted with <Heart className="inline w-4 h-4 text-coral fill-coral mx-1 animate-pulse" /> for Indonesia.
          </p>
          <div className="max-w-xl bg-white/5 neo-border p-4 rounded-xl text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.1em] font-medium leading-relaxed">
            Meskipun proyek ini memiliki kemampuan AI, ada batasan jumlah permintaan yang dapat dilakukan ke server AI di seluruh aplikasi pengguna dalam periode waktu tertentu. Gunakan dengan bijak untuk pelestarian budaya.
          </div>
        </div>
      </div>
    </footer>
  );
}