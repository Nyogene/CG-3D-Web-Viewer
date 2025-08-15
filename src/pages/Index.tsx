import ThreeScene from '../components/ThreeScene';
import PartDetailsPanel from '../components/customization/PartDetailsPanel';

import { Dropdown, DropdownContent, ToggleButton, Searchbar } from '../components/ui/UIComponents';
import { partTypeRegistry } from '../components/Types';
import { partRegistry } from '../components/ModelPart';
import { useState, type ChangeEvent } from 'react';
import type { ModelPart } from '../components/Types';
import styles from './viewer.module.css';

export default function Index() {
  const allParts = Object.values(partRegistry).flat();
  
  const [selectedPart, setSelectedPart] = useState<ModelPart | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeParts, setActiveParts] = useState<ModelPart[]>(allParts);
  const [searchText, setSearchText] = useState("");
  

  const filteredParts = allParts.filter((part) => {
    if (searchText.trim() === '') {
      return true;
    }
    return part.name.toLowerCase().includes(searchText.toLowerCase());
  });

  
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


  let inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toLowerCase(); 
    setSearchText(input);
  }

  return (
    <div className={styles.root} style={{ minWidth: '800px' }}>
      <div className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandTitle}>
            CRIMSON-CONFIGURATOR <span className={styles.brandVersion}>V1.04</span>
          </h1>
          <p className={styles.brandSubtitle}>CUSTOMIZE YOUR MECHA</p>
        </div>

        <div className={styles.spaceY3}>
          {partTypeRegistry.map((partType) => {
            const partsPerType = allParts.filter((part) => part.partType === partType.id);

            return (
              partsPerType.length > 0 && (
                <Dropdown key={partType.id} displayItems={partsPerType} onItemSelect={selectPart}>
                  <ToggleButton title={partType.name} />
                  <DropdownContent />
                </Dropdown>
              )
            );
          })}
        </div>
      </div>

      <div className={styles.stage}>
        <ThreeScene selectedParts={activeParts} selectedPart={selectedPart} onPartClick={selectPart} className={styles.fullSize} />

        <div className={styles.bottomBarWrap}>
          <div className={styles.bottomBar}>
            <div className={styles.bottomBarRow}>
              <button onClick={handleResetView} className={styles.primaryBtn}>Reset View</button>
              <button onClick={handleTogglePhotoMode} className={styles.primaryBtn}>Photo Mode (WIP)</button>
            </div>
          </div>
        </div>
      </div>

      <PartDetailsPanel selectedPart={selectedPart} onWindowClose={handlePanelClose} isOpen={isPanelOpen} onRemovePart={handleRemovePart} />
    </div>
  );
}