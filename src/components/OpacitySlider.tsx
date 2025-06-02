
import React, { useRef, useCallback, useEffect } from 'react';

interface OpacitySliderProps {
  opacity: number;
  color: string;
  onChange: (opacity: number) => void;
}

export const OpacitySlider: React.FC<OpacitySliderProps> = ({ opacity, color, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!isDragging.current) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const newOpacity = (x / rect.width) * 100;

    onChange(newOpacity);
  }, [onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        className="w-full h-5 rounded-full cursor-pointer border border-[#EEEEEE]"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${color} 100%)`
        }}
      />
      {/* Slider Handle with white color only */}
      <div
        className="absolute w-5 h-5 border-2 border-[#EEEEEE] rounded-full shadow-lg transform -translate-x-2.5 -translate-y-0.5 pointer-events-none z-30"
        style={{
          left: `${opacity}%`,
          top: '0px',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};
