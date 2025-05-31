
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  resetAll: () => void;
}

export const ActionButtons = ({ resetAll }: ActionButtonsProps) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={resetAll}
        className="inline-flex items-center px-4 py-2 rounded transition-all shadow-lg text-white border"
        style={{ 
          backgroundColor: 'red',
          borderColor: '#ccc'
        }}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset All
      </button>
    </div>
  );
};
