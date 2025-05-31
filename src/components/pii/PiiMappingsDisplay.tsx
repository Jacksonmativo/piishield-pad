
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
    <Card className="shadow-xl" style={{ backgroundColor: '#fafafa', borderColor: '#ccc' }}>
      <CardHeader>
        <CardTitle style={{ color: 'darkgray' }} className="flex items-center gap-2">
          <Shield className="w-5 h-5" style={{ color: '#249CFF' }} />
          Detected PII Mappings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(piiMappings).map(([placeholder, original]) => (
            <div key={placeholder} className="p-3 rounded-lg border shadow-sm" style={{ backgroundColor: '#ccc', borderColor: '#ccc' }}>
              <div className="text-xs mb-1" style={{ color: 'darkgray' }}>Placeholder</div>
              <div className="text-sm font-mono mb-2" style={{ color: '#249CFF' }}>{placeholder}</div>
              <div className="text-xs mb-1" style={{ color: 'darkgray' }}>Original</div>
              <div className="text-sm font-mono text-white">{original}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
