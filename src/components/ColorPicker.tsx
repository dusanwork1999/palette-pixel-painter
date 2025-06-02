
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ColorPickerModal } from './ColorPickerModal';

export const ColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700"
        >
          Open Color Picker
        </Button>
      </div>
    );
  }

  return <ColorPickerModal onClose={() => setIsOpen(false)} />;
};
