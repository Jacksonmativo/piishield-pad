
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
    <div className="mb-6 p-4 bg-[#0E2954]/40 rounded-lg border border-[#1F6E8C]/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Select PII Types to Anonymize</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-sm px-3 py-1 bg-[#1F6E8C] text-white rounded hover:bg-[#0E2954] transition-colors"
          >
            Select All
          </button>
          <button
            onClick={handleSelectNone}
            className="text-sm px-3 py-1 bg-[#2E8A99] text-white rounded hover:bg-[#1F6E8C] transition-colors"
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
            className={`cursor-pointer transition-all ${
              selectedTypes.includes(type)
                ? 'bg-[#2E8A99] text-white hover:bg-[#1F6E8C]'
                : 'bg-[#84A7A1]/30 text-slate-300 hover:bg-[#84A7A1]/50'
            }`}
            onClick={() => handleTypeToggle(type)}
          >
            {type.replace(/_/g, ' ')}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm text-slate-400 mt-3">
        Selected: {selectedTypes.length} of {allTypes.length} types
      </p>
    </div>
  );
};
