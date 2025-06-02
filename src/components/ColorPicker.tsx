
import React, { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  onColorChange?: (color: string) => void;
  defaultColor?: string;
}

const ColorPicker = ({ onColorChange, defaultColor = '#3B82F6' }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const colors = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#64748B', '#6B7280', '#374151',
    '#1F2937', '#111827', '#000000', '#FFFFFF', '#F3F4F6'
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Color Picker</h2>
      </div>

      {/* Selected Color Preview */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-600 mb-3">Selected Color</p>
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-xl shadow-lg border-4 border-white ring-2 ring-gray-200 transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: selectedColor }}
          />
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <p className="text-lg font-mono font-medium text-gray-800">{selectedColor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-4">Choose a Color</p>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`
                w-12 h-12 rounded-xl shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg
                border-4 border-white ring-2 ring-gray-200 hover:ring-gray-300
                ${selectedColor === color ? 'ring-4 ring-blue-500 scale-105' : ''}
              `}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-600">
          Click on any color to select it. The selected color code will be displayed above.
        </p>
      </div>
    </div>
  );
};

export default ColorPicker;
