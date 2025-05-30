
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ArrowRight } from "lucide-react";

interface CopyAnonymizedSectionProps {
  anonymizedText: string;
  copyToClipboard: (text: string, label: string) => void;
}

export const CopyAnonymizedSection = ({
  anonymizedText,
  copyToClipboard
}: CopyAnonymizedSectionProps) => {
  return (
    <Card className="bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border-emerald-400/30 mb-8 shadow-xl shadow-emerald-900/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Step 2: Copy Anonymized Text</h3>
              <p className="text-slate-300">Copy the anonymized version to share with AI safely</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-emerald-300" />
            <Button
              onClick={() => copyToClipboard(anonymizedText, 'Anonymized text')}
              disabled={!anonymizedText}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Anonymized
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
