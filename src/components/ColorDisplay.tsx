
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ColorDisplayProps {
  colorWithOpacity: string;
  hex: string;
  opacity: number;
  onHexChange: (hex: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({
  colorWithOpacity,
  hex,
  opacity,
  onHexChange,
  onOpacityChange
}) => {
  const [tempHex, setTempHex] = useState(hex);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempHex(e.target.value);
  };

  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleHexCommit();
    }
  };

  const handleHexBlur = () => {
    handleHexCommit();
  };

  const handleHexCommit = () => {
    const cleanHex = tempHex.startsWith('#') ? tempHex : `#${tempHex}`;
    
    // Validate hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      onHexChange(cleanHex);
    } else {
      // Revert to original value if invalid
      setTempHex(hex);
    }
  };

  const handleOpacitySpinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onOpacityChange(value);
    }
  };

  // Update tempHex when hex prop changes
  React.useEffect(() => {
    setTempHex(hex);
  }, [hex]);

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Custom Color</h3>
      <div className="flex items-center gap-3">
        <div 
          className="w-8 h-8 rounded-full border border-[#EEEEEE] flex-shrink-0"
          style={{ backgroundColor: colorWithOpacity }}
        />
        <Input
          value={tempHex}
          onChange={handleHexInputChange}
          onKeyDown={handleHexKeyDown}
          onBlur={handleHexBlur}
          className="flex-1 font-mono text-sm"
          placeholder="#F04343"
        />
        
        {/* Opacity Spinner */}
        <Input
          value={opacity}
          onChange={handleOpacitySpinnerChange}
          className="w-16 text-sm text-center"
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
