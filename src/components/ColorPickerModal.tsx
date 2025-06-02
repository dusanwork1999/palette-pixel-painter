
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { GradientCanvas } from './GradientCanvas';
import { ThemeColors } from './ThemeColors';
import { ColorDisplay } from './ColorDisplay';
import { ColorInputs } from './ColorInputs';
import { ColorPickerActions } from './ColorPickerActions';
import { useColorState } from '../hooks/useColorState';

interface ColorPickerModalProps {
  onClose: () => void;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ onClose }) => {
  const {
    hsb,
    setHsb,
    hex,
    setHex,
    opacity,
    setOpacity
  } = useColorState();

  const opacityIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSaturationBrightnessChange = useCallback((saturation: number, brightness: number) => {
    setHsb(prev => ({ ...prev, s: saturation, b: brightness }));
  }, [setHsb]);

  const handleHueChange = useCallback((hue: number) => {
    setHsb(prev => ({ ...prev, h: hue }));
  }, [setHsb]);

  const handleThemeColorSelect = useCallback((color: string) => {
    setHex(color);
  }, [setHex]);

  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
  }, [setHex]);

  const handleOpacityInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setOpacity(value);
    }
  }, [setOpacity]);

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
    console.log('Selected color:', hex, 'Opacity:', opacity);
    onClose();
  }, [hex, opacity, onClose]);

  // Calculate color with opacity for preview
  const colorWithOpacity = useMemo(() => {
    // Convert hex to rgba with opacity
    if (hex.startsWith('#') && hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    return hex;
  }, [hex, opacity]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
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
          hsb={hsb}
          opacity={opacity}
          onHexChange={handleHexChange}
          onOpacityInputChange={handleOpacityInputChange}
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
