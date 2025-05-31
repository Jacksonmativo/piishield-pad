
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  resetAll: () => void;
}

export const ActionButtons = ({ resetAll }: ActionButtonsProps) => {
  return (
    <div className="flex justify-center mt-8">
      <Button
        onClick={resetAll}
        variant="outline"
        className="border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-400 hover:text-red-200 transition-all shadow-lg backdrop-blur-sm"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset All
      </Button>
    </div>
  );
};
