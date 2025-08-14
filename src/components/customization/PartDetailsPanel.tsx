import CustomizationGroup from './CustomizationGroup';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import type { CustomizationOption, ModelPart } from '../Types';


interface PartDetailsPanelProps {
  selectedPart: ModelPart | null;
  isOpen: boolean;
  onWindowClose: () => void;
  onRemovePart?: (partId: string) => void;
}


export default function PartDetailsPanel({ selectedPart, onWindowClose: onClose, isOpen, onRemovePart }: PartDetailsPanelProps) {
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [selectedTexture, setSelectedTexture] = useState<string>('none');
  const [selectedSticker, setSelectedSticker] = useState<string>('none');

  if (!isOpen || !selectedPart) {
    return null;
  }

  const colorOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    option => option.customizationType === "color"
  );

  const textureOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    option => option.customizationType === "texture"
  );

  const stickerOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    option => option.customizationType === "sticker"
  );

  return (
      <div className="border-l-5 border-orange-500 p-2 sm:p-4 overflow-y-auto" 
        style={{ 
          backgroundColor: "rgb(47, 46, 45)", 
          width: "clamp(260px, 25vw, 400px)", 
          flexShrink: 0 
        }}
      >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold" style={{ color: '#ffffffff' }}>CUSTOMIZE</h1>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-700 rounded transition-colors"
        >
          <IoClose className="w-8 h-8 text-gray-300 hover:text-white" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-800 rounded p-4">
          <h3 className="text-orange-500 font-semibold">{selectedPart?.name || 'No part selected'}</h3>
          <p className="text-orange-500 text-sm">{selectedPart?.partType || 'Select a part to customize'}</p>
        </div>

        <CustomizationGroup
          title="Color Theme"
          options={colorOptions ?? []}
          selectedOption={selectedColor}
          onOptionSelect={setSelectedColor}
        />

        <CustomizationGroup
          title="Surface Texture"
          options={textureOptions ?? []}
          selectedOption={selectedTexture}
          onOptionSelect={setSelectedTexture}
        />

        <CustomizationGroup
          title="Stickers & Decals"
          options={stickerOptions ?? []}
          selectedOption={selectedSticker}
          onOptionSelect={setSelectedSticker}
        />

      </div>
    </div>
  );
}