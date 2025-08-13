import type { CustomizationOption } from '../Types';


interface CustomizationGroupProps {
  title: string;
  options: CustomizationOption[];
  selectedOption?: string;
  onOptionSelect: (optionId: string) => void;
}


export default function CustomizationGroup({
  title,
  options,
  selectedOption,
  onOptionSelect
}: CustomizationGroupProps) {
  return (
    <div className="space-y-5">
      <div className="bg-zinc-800 rounded p-3">
        <h4 className="text-neutral-50 font-medium text-sm">{title}</h4>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center gap-5">
            <div className="w-8 h-8 bg-neutral-50 rounded flex items-center justify-center">
              <div style={{ backgroundColor: option.color }}>
                {option.icon}
              </div>
            </div>
            <button
              onClick={() => onOptionSelect(option.id)}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${selectedOption === option.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-600 text-white hover:bg-zinc-400'
                }`}
            >
              {option.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

