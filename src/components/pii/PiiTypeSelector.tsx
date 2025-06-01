
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
    <div className="mb-6 p-4 rounded-lg border shadow-xl" style={{ backgroundColor: '#fafafa', borderColor: '#ccc' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'darkgray' }}>Select PII Types to Anonymize</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-sm px-3 py-1 text-white rounded transition-colors shadow-sm"
            style={{ backgroundColor: '#007bff' }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#007bff'}
          >
            Select All
          </button>
          <button
            onClick={handleSelectNone}
            className="text-sm px-3 py-1 text-white rounded transition-colors shadow-sm"
            style={{ backgroundColor: '#007bff' }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#007bff'}
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
                ? 'text-white'
                : 'text-darkgray'
            }`}
            style={{
              backgroundColor: selectedTypes.includes(type) ? '#249CFF' : '#ccc'
            }}
            onClick={() => handleTypeToggle(type)}
          >
            {type.replace(/_/g, ' ')}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm mt-3" style={{ color: 'darkgray' }}>
        Selected: {selectedTypes.length} of {allTypes.length} types
      </p>
    </div>
  );
};
