import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  images: Array<{ url: string; caption?: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) => {
  if (!images || images.length === 0) return null;
  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-white/80 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={current.url}
          alt={current.caption || 'Activity photograph'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          referrerPolicy="no-referrer"
        />

        {current.caption && (
          <p className="mt-4 text-center text-white text-sm bg-slate-900/80 px-4 py-2 rounded-lg max-w-xl font-medium">
            {current.caption}
          </p>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </div>
  );
};
