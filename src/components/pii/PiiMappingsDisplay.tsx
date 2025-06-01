
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { PiiMappings } from "@/types/pii";

interface PiiMappingsDisplayProps {
  piiMappings: PiiMappings;
}

export const PiiMappingsDisplay = ({ piiMappings }: PiiMappingsDisplayProps) => {
  if (Object.keys(piiMappings).length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          Detected PII Mappings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(piiMappings).map(([placeholder, original]) => (
            <div key={placeholder} className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 shadow-sm">
              <div className="text-xs mb-1 text-gray-400">Placeholder</div>
              <div className="text-sm font-mono mb-2 text-blue-300">{placeholder}</div>
              <div className="text-xs mb-1 text-gray-400">Original</div>
              <div className="text-sm font-mono text-white">{original}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
