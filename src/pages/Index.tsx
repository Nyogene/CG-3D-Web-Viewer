import ThreeScene from '../components/ThreeScene';
import PartDetailsPanel from '../components/customization/PartDetailsPanel';

import { useState } from 'react';
import { Dropdown, DropdownContent, ToggleButton } from '../components/ui/UIComponents';
import { partTypeRegistry } from '../components/Types';
import { partRegistry } from '../components/ModelPart';
import type { ModelPart } from '../components/Types';


export default function Index() {
  const allParts = Object.values(partRegistry).flat();

  const [selectedPart, setSelectedPart] = useState<ModelPart | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeParts, setActiveParts] = useState<ModelPart[]>(allParts);

  const selectPart = (part: ModelPart) => {
    const updatedPart = { ...part, isSelected: true, isVisible: true };

    setSelectedPart(updatedPart);
    setIsPanelOpen(true);

    setActiveParts(prev => {
      const filtered = prev.filter(p => p.partType !== part.partType);
      return [...filtered, updatedPart];
    });
  };

  const handleResetView = () => {
    setActiveParts([]);
    setSelectedPart(null); // Change this so it resets to default parts
    setIsPanelOpen(false);
  };

  const handleTogglePhotoMode = () => {
    // Toggle UI Visibility here
  };

  const handleRemovePart = (partId: string) => {
    setActiveParts(prev => prev.filter(p => p.id !== partId));
    if (selectedPart?.id === partId) {
      setSelectedPart(null);
      setIsPanelOpen(false);
    }
  };


  const handlePanelClose = () => {
    setIsPanelOpen(false);
    // Don't reset selectedPart to null to keep visual state
  };

 return (
    <div className="h-screen w-screen flex bg-gray-950 overflow-hidden" style={{ minWidth: '800px' }}>
      
      <div className="w-80 lg:w-1/4 xl:w-80 p-2 sm:p-4 overflow-y-auto flex-shrink-0" style={{ backgroundColor: '#2f2e2d', minWidth: '260px', maxWidth: '400px' }}>
        <div className="mb-6">
          <h1 className="text-2xl text-orange-500 font-bold mb-2">
            CRIMSON-CONFIGURATOR <span className="text-white">V1.04</span>
          </h1>
          <p className="text-gray-400 text-sm">CUSTOMIZE YOUR MECHA</p>
        </div>
        
        <div className="space-y-3">
          {partTypeRegistry.map((partType) => {
            const partsPerType = allParts.filter(part => part.partType === partType.id);

            return partsPerType.length > 0 && (
              <Dropdown
                key={partType.id}
                displayItems={partsPerType}
                onItemSelect={selectPart}
              >
                <ToggleButton title={partType.name} />
                <DropdownContent />
              </Dropdown>
            );
          })}
        </div>
        
      </div>

      <div className="flex-1 relative min-w-0">
        <ThreeScene
          selectedParts={activeParts}
          selectedPart={selectedPart}
          onPartClick={selectPart}
          className="w-full h-full"
        />
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-zinc-700 border border-gray-500/30 rounded-lg p-3">
            <div className="flex gap-3">
              <button
                onClick={handleResetView}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 transition-colors"
              >
                Reset View
              </button>
              <button
                onClick={handleTogglePhotoMode}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 transition-colors"
              >
                Photo Mode (WIP)
              </button>
            </div>
          </div>
        </div>
      </div>

      <PartDetailsPanel
        selectedPart={selectedPart}
        onWindowClose={handlePanelClose}
        isOpen={isPanelOpen}
        onRemovePart={handleRemovePart}
      />
    </div>
  );
}