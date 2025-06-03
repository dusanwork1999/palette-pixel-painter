
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ColorPickerModal } from './ColorPickerModal';

interface ColorResult {
  hex: string;
  opacity: number;
}

export const ColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorResult>({ hex: '#F04343', opacity: 100 });
  const [positionX, setPositionX] = useState(100);
  const [positionY, setPositionY] = useState(100);

  const handleColorSelect = (colorResult: ColorResult) => {
    setSelectedColor(colorResult);
    console.log('Selected color:', colorResult);
    setIsOpen(false);
  };

  const handleOpenPicker = () => {
    setIsOpen(true);
  };

  // Calculate color with opacity for preview
  const getColorWithOpacity = () => {
    if (selectedColor.hex.startsWith('#') && selectedColor.hex.length === 7) {
      const r = parseInt(selectedColor.hex.slice(1, 3), 16);
      const g = parseInt(selectedColor.hex.slice(3, 5), 16);
      const b = parseInt(selectedColor.hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${selectedColor.opacity / 100})`;
    }
    return selectedColor.hex;
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleOpenPicker}
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Open Color Picker
            </Button>
            <div 
              className="w-12 h-12 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: getColorWithOpacity() }}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-12 text-sm font-medium">X:</label>
              <Input
                type="number"
                value={positionX}
                onChange={(e) => setPositionX(Number(e.target.value))}
                className="w-24"
                min="0"
              />
              <label className="w-12 text-sm font-medium">Y:</label>
              <Input
                type="number"
                value={positionY}
                onChange={(e) => setPositionY(Number(e.target.value))}
                className="w-24"
                min="0"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Selected Color Info</h3>
              <div className="flex items-center gap-4">
                <label className="w-16 text-sm font-medium">Hex:</label>
                <Input
                  type="text"
                  value={selectedColor.hex}
                  readOnly
                  className="flex-1 bg-gray-100 font-mono text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-16 text-sm font-medium">Opacity:</label>
                <Input
                  type="number"
                  value={selectedColor.opacity}
                  readOnly
                  className="w-24 bg-gray-100 text-center"
                />
                <span className="text-sm font-medium text-gray-600">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ColorPickerModal 
      onClose={() => setIsOpen(false)} 
      onSelect={handleColorSelect}
      position={{ x: positionX, y: positionY }}
    />
  );
};
