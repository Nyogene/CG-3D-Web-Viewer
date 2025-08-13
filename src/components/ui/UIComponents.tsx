import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useState, useRef, useContext, createContext } from 'react';
import type { ModelPart } from '../Types';


interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayItems: ModelPart[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onItemSelect?: (item: ModelPart) => void;
}


const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);


export const Dropdown = ({ children, displayItems, onItemSelect }: { children: React.ReactNode, displayItems: ModelPart[], onItemSelect?: (item: ModelPart) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownContext.Provider value={{ 
      isOpen, 
      setIsOpen,
      displayItems, 
      dropdownRef,
      onItemSelect 
    }}>
      <div className="w-full" ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  )
}


export const ToggleButton = ({ title }: { title: string }) => {
  const context = useContext(DropdownContext);

  return (
    <button 
      onClick={() => context?.setIsOpen(!context?.isOpen)}
      className="w-full flex items-center justify-between p-3 bg-orange-500 rounded-lg hover:opacity-80 transition-colors text-white font-medium"
    >
      <span>
        {title}
      </span>
      {context?.isOpen ? <FiChevronUp className="w-4 h-4"/> : <FiChevronDown className="w-4 h-4"/>}
    </button>
  );
}


export const DropdownContent = () => {
  const context = useContext(DropdownContext);

  return context?.isOpen && (
    <div className="mt-1 bg-zinc-800 border border-zinc-600 rounded-lg overflow-hidden">
      <ul>
        {context.displayItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => context.onItemSelect?.(item)}
              className="w-full text-left p-3 transition-colors border-b border-gray-600 last:border-b-0 text-gray-200 hover:bg-white/10 hover:text-white"
            >
              <div className="font-medium">{item.name}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}