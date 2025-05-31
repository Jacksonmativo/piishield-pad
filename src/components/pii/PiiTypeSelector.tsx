
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
    <div className="mb-6 p-4 bg-[#0b0909]/40 rounded-lg border border-[#44444c]/50 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Select PII Types to Anonymize</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-sm px-3 py-1 bg-[#44444c] text-white rounded hover:bg-[#8c8c8c] transition-colors shadow-sm"
          >
            Select All
          </button>
          <button
            onClick={handleSelectNone}
            className="text-sm px-3 py-1 bg-[#8c8c8c] text-white rounded hover:bg-[#d6d6d6] hover:text-[#0b0909] transition-colors shadow-sm"
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
                ? 'bg-[#8c8c8c] text-white hover:bg-[#d6d6d6] hover:text-[#0b0909]'
                : 'bg-[#44444c]/30 text-[#d6d6d6] hover:bg-[#44444c]/50'
            }`}
            onClick={() => handleTypeToggle(type)}
          >
            {type.replace(/_/g, ' ')}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm text-[#8c8c8c] mt-3">
        Selected: {selectedTypes.length} of {allTypes.length} types
      </p>
    </div>
  );
};
