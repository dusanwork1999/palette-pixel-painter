
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { GradientCanvas } from './GradientCanvas';
import { ThemeColors } from './ThemeColors';
import { ColorDisplay } from './ColorDisplay';
import { ColorInputs } from './ColorInputs';
import { ColorPickerActions } from './ColorPickerActions';
import { useColorState } from '../hooks/useColorState';

interface ColorResult {
  hex: string;
  opacity: number;
}

interface ColorPickerModalProps {
  onClose: () => void;
  onSelect: (colorResult: ColorResult) => void;
  position: { x: number; y: number };
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ onClose, onSelect, position }) => {
  const {
    hsb,
    setHsb,
    hex,
    setHex,
    opacity,
    setOpacity
  } = useColorState();

  const handleSaturationBrightnessChange = useCallback((saturation: number, brightness: number) => {
    setHsb(prev => ({ ...prev, s: saturation, b: brightness }));
  }, [setHsb]);

  const handleHueChange = useCallback((hue: number) => {
    setHsb(prev => ({ ...prev, h: hue }));
  }, [setHsb]);

  const handleThemeColorSelect = useCallback((color: string) => {
    setHex(color);
  }, [setHex]);

  const handleEyedropper = useCallback(() => {
    if ('EyeDropper' in window) {
      // @ts-ignore - EyeDropper API is not yet in TypeScript types
      const eyeDropper = new EyeDropper();
      eyeDropper.open().then((result: any) => {
        setHex(result.sRGBHex);
      }).catch((error: any) => {
        console.log('User cancelled the eyedropper');
      });
    } else {
      console.log('EyeDropper API not supported');
    }
  }, [setHex]);

  const handleSelect = useCallback(() => {
    const colorResult: ColorResult = { hex, opacity };
    console.log('Selected color:', colorResult);
    onSelect(colorResult);
  }, [hex, opacity, onSelect]);

  // Calculate color with opacity for preview
  const colorWithOpacity = useMemo(() => {
    if (hex.startsWith('#') && hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    return hex;
  }, [hex, opacity]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-start p-4 z-50">
      <div 
        className="bg-white rounded-2xl shadow-2xl p-6 w-80 font-roboto overflow-auto"
        style={{
          marginLeft: `${position.x}px`,
          marginTop: `${position.y}px`,
        }}
      >
        {/* Gradient Canvas */}
        <div className="mb-6">
          <GradientCanvas
            hue={hsb.h}
            saturation={hsb.s}
            brightness={hsb.b}
            previewColor={hex}
            onChange={handleSaturationBrightnessChange}
          />
        </div>

        {/* Eyedropper and Sliders Section */}
        <ColorInputs
          hsb={hsb}
          opacity={opacity}
          hex={hex}
          onHueChange={handleHueChange}
          onOpacityChange={setOpacity}
          onEyedropper={handleEyedropper}
        />

        {/* Custom Color Section */}
        <ColorDisplay
          colorWithOpacity={colorWithOpacity}
          hex={hex}
          opacity={opacity}
          onHexChange={setHex}
          onOpacityChange={setOpacity}
        />

        {/* Theme Colors */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Theme Colors</h3>
          <ThemeColors onColorSelect={handleThemeColorSelect} />
        </div>

        {/* Action Buttons */}
        <ColorPickerActions
          hex={hex}
          opacity={opacity}
          onCancel={onClose}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};
