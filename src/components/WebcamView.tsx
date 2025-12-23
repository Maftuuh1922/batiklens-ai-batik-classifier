import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, RefreshCcw, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface WebcamViewProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}
export function WebcamView({ onCapture, onClose }: WebcamViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const animationFrameRef = useRef<number>();
  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);
  const startCamera = useCallback(async () => {
    setError(null);
    try {
      stopTracks();
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setError(err.name === 'NotAllowedError'
        ? "Akses kamera ditolak. Mohon izinkan kamera untuk memindai batik."
        : "Gagal mengakses kamera. Pastikan perangkat Anda mendukung fitur ini.");
    }
  }, [stopTracks]);
  useEffect(() => {
    startCamera();
    return () => {
      stopTracks();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startCamera, stopTracks]);
  useEffect(() => {
    if (!isReady || !overlayCanvasRef.current) return;
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let position = 0;
    let direction = 1;
    const speed = 2.5;
    const resizeOverlay = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeOverlay();
    window.addEventListener('resize', resizeOverlay);
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const y = position;
      const gradient = ctx.createLinearGradient(0, y - 20, 0, y + 20);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, '#A3E635');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - 2, canvas.width, 4);
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#A3E635';
      ctx.strokeStyle = '#A3E635';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      position += speed * direction;
      if (position >= canvas.height || position <= 0) direction *= -1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeOverlay);
    };
  }, [isReady]);
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 150);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onCapture(dataUrl);
    }
  };
  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-black rounded-3xl overflow-hidden neo-border">
      <AnimatePresence>
        {isFlashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[70] pointer-events-none"
          />
        )}
      </AnimatePresence>
      {error ? (
        <div className="p-8 text-center space-y-6">
          <div className="bg-coral/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto neo-border border-coral">
            <AlertTriangle className="w-10 h-10 text-coral" />
          </div>
          <p className="text-white font-bold text-lg max-w-xs">{error}</p>
          <div className="flex gap-4">
            <Button onClick={startCamera} className="neo-btn bg-lime text-black border-none">
              <RefreshCcw className="w-4 h-4 mr-2" /> Coba Lagi
            </Button>
            <Button onClick={onClose} variant="outline" className="neo-btn border-white text-white bg-transparent">
              Kembali
            </Button>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedMetadata={() => setIsReady(true)}
            className="w-full h-full object-cover mirror-mode"
          />
          <canvas
            ref={overlayCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 z-20">
            <button
              onClick={onClose}
              className="p-4 bg-white/10 backdrop-blur-md rounded-2xl neo-border border-white/40 text-white hover:bg-white/20 transition-all active:scale-90"
              title="Tutup Kamera"
            >
              <CameraOff className="w-6 h-6" />
            </button>
            <button
              onClick={captureFrame}
              disabled={!isReady}
              className="group relative w-20 h-20 bg-lime rounded-full neo-border border-black shadow-neo-sm hover:shadow-neo-lg transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              <div className="absolute inset-1 border-4 border-black/10 rounded-full animate-ping-slow pointer-events-none" />
              <div className="flex items-center justify-center h-full">
                <Camera className="w-10 h-10 text-black" />
              </div>
            </button>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl neo-border border-white/40 text-white">
              <Zap className="w-6 h-6 text-lime animate-pulse" />
            </div>
          </div>
          {!isReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30">
              <RefreshCcw className="w-12 h-12 text-lime animate-spin mb-4" />
              <p className="text-lime font-display font-black uppercase tracking-widest text-sm">Menyiapkan Sensor...</p>
            </div>
          )}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full neo-border border-white/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Live Vision AI</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}