
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
        className="border-rose-500/50 text-rose-300 hover:bg-rose-500/10 hover:border-rose-400 hover:text-rose-200 transition-all shadow-lg"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset All
      </Button>
    </div>
  );
};
