
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
    <Card className="bg-slate-900/40 border-slate-700/50 shadow-xl shadow-slate-900/20">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          Detected PII Mappings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(piiMappings).map(([placeholder, original]) => (
            <div key={placeholder} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600/50 shadow-sm">
              <div className="text-xs text-slate-400 mb-1">Placeholder</div>
              <div className="text-sm text-indigo-300 font-mono mb-2">{placeholder}</div>
              <div className="text-xs text-slate-400 mb-1">Original</div>
              <div className="text-sm text-slate-100 font-mono">{original}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
