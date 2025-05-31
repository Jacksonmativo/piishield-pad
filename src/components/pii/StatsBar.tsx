
import { Badge } from "@/components/ui/badge";
import { Shield, Eye } from "lucide-react";

interface StatsBarProps {
  detectedPIICount: number;
  showOriginal: boolean;
}

export const StatsBar = ({ detectedPIICount, showOriginal }: StatsBarProps) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Badge variant="secondary" className="text-white shadow-sm" style={{ backgroundColor: '#249CFF', borderColor: '#ccc' }}>
        <Shield className="w-4 h-4 mr-2" />
        {detectedPIICount} PII items detected
      </Badge>
      <Badge variant="secondary" className="text-white shadow-sm" style={{ backgroundColor: '#249CFF', borderColor: '#ccc' }}>
        <Eye className="w-4 h-4 mr-2" />
        {showOriginal ? 'Original view' : 'Anonymized view'}
      </Badge>
    </div>
  );
};
