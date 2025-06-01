
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PII_PATTERNS } from '@/utils/piiDetection';

interface PiiTypeSelectorProps {
  selectedTypes: string[];
  onSelectionChange: (types: string[]) => void;
}

export const PiiTypeSelector = ({ selectedTypes, onSelectionChange }: PiiTypeSelectorProps) => {
  const allTypes = Object.keys(PII_PATTERNS);
  
  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onSelectionChange(selectedTypes.filter(t => t !== type));
    } else {
      onSelectionChange([...selectedTypes, type]);
    }
  };

  const handleSelectAll = () => {
    onSelectionChange(allTypes);
  };

  const handleSelectNone = () => {
    onSelectionChange([]);
  };

  return (
    <div className="mb-6 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Select PII Types to Anonymize</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-sm px-3 py-1 bg-white text-black rounded transition-colors shadow-sm hover:bg-gray-200"
          >
            Select All
          </button>
          <button
            onClick={handleSelectNone}
            className="text-sm px-3 py-1 bg-white text-black rounded transition-colors shadow-sm hover:bg-gray-200"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTypes.map((type) => (
          <Badge
            key={type}
            variant={selectedTypes.includes(type) ? "default" : "secondary"}
            className={`cursor-pointer transition-all shadow-sm ${
              selectedTypes.includes(type)
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => handleTypeToggle(type)}
          >
            {type.replace(/_/g, ' ')}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm mt-3 text-gray-300">
        Selected: {selectedTypes.length} of {allTypes.length} types
      </p>
    </div>
  );
};
