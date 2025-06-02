
import React from 'react';
import { Button } from '@/components/ui/button';

interface ColorPickerActionsProps {
  hex: string;
  opacity: number;
  onCancel: () => void;
  onSelect: () => void;
}

export const ColorPickerActions: React.FC<ColorPickerActionsProps> = ({
  hex,
  opacity,
  onCancel,
  onSelect
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="ghost" 
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700"
      >
        Cancel
      </Button>
      <Button 
        onClick={onSelect}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Select
      </Button>
    </div>
  );
};
