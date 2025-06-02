
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorDisplayProps {
  colorWithOpacity: string;
  hex: string;
  hsb: { h: number; s: number; b: number };
  opacity: number;
  onHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpacityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({
  colorWithOpacity,
  hex,
  hsb,
  opacity,
  onHexChange,
  onOpacityInputChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Custom Color</h3>
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-full border border-[#EEEEEE] flex-shrink-0"
          style={{ backgroundColor: colorWithOpacity }}
        />
        <Input
          value={hex}
          onChange={onHexChange}
          className="flex-1 font-mono text-sm"
          placeholder="#F04343"
        />
        
        {/* Hue Display */}
        <Input
          value={Math.round(hsb.h)}
          readOnly
          className="w-16 text-sm text-center bg-gray-100 cursor-not-allowed"
        />
        
        {/* Opacity Input */}
        <Input
          value={Math.round(opacity)}
          onChange={onOpacityInputChange}
          className="w-16 text-sm text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="100"
          type="number"
          min="0"
          max="100"
        />
        <span className="text-sm font-medium text-gray-600">%</span>
      </div>
    </div>
  );
};
