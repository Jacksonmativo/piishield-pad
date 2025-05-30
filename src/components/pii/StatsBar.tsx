
import { Badge } from "@/components/ui/badge";
import { Shield, Eye } from "lucide-react";

interface StatsBarProps {
  detectedPIICount: number;
  showOriginal: boolean;
}

export const StatsBar = ({ detectedPIICount, showOriginal }: StatsBarProps) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-200 border-indigo-500/30 shadow-sm">
        <Shield className="w-4 h-4 mr-2" />
        {detectedPIICount} PII items detected
      </Badge>
      <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-purple-500/30 shadow-sm">
        <Eye className="w-4 h-4 mr-2" />
        {showOriginal ? 'Original view' : 'Anonymized view'}
      </Badge>
    </div>
  );
};
