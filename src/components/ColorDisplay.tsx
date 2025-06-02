
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ColorDisplayProps {
  colorWithOpacity: string;
  hex: string;
  opacity: number;
  onHexChange: (newHex: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({
  colorWithOpacity,
  hex,
  opacity,
  onHexChange,
  onOpacityChange
}) => {
  const [localHex, setLocalHex] = useState(hex);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalHex(e.target.value);
  };

  const handleHexSubmit = () => {
    // Validate hex color format
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexPattern.test(localHex)) {
      onHexChange(localHex);
    } else {
      // Reset to original value if invalid
      setLocalHex(hex);
    }
  };

  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleHexSubmit();
    }
  };

  // Update local state when prop changes
  React.useEffect(() => {
    setLocalHex(hex);
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
          value={localHex}
          onChange={handleHexInputChange}
          onBlur={handleHexSubmit}
          onKeyDown={handleHexKeyDown}
          className="flex-1 font-mono text-sm"
          placeholder="#F04343"
        />
        
        {/* Opacity Input with Spinner */}
        <Input
          value={Math.round(opacity)}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 100) {
              onOpacityChange(value);
            }
          }}
          className="w-20 text-sm text-center"
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
