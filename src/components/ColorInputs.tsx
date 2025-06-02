
import React from 'react';
import { Button } from '@/components/ui/button';
import { ColorSlider } from './ColorSlider';
import { OpacitySlider } from './OpacitySlider';
import { Pipette } from 'lucide-react';

interface ColorInputsProps {
  hsb: { h: number; s: number; b: number };
  opacity: number;
  hex: string;
  onHueChange: (hue: number) => void;
  onOpacityChange: (opacity: number) => void;
  onEyedropper: () => void;
}

export const ColorInputs: React.FC<ColorInputsProps> = ({
  hsb,
  opacity,
  hex,
  onHueChange,
  onOpacityChange,
  onEyedropper
}) => {
  return (
    <div className="mb-6 flex items-start gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEyedropper}
        className="p-2 hover:bg-gray-100 flex-shrink-0 border-2 border-gray-300"
        style={{ width: '40px', height: '40px' }}
      >
        <Pipette className="w-4 h-4" />
      </Button>
      
      <div className="flex-1 space-y-3">
        {/* Hue Slider */}
        <div>
          <ColorSlider
            hue={hsb.h}
            onChange={onHueChange}
          />
        </div>
        
        {/* Opacity Slider */}
        <div>
          <OpacitySlider
            opacity={opacity}
            color={hex}
            onChange={onOpacityChange}
          />
        </div>
      </div>
    </div>
  );
};
