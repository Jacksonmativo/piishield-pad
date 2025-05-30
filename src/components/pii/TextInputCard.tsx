
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Eye, EyeOff } from "lucide-react";
import { highlightPII } from "@/utils/piiDetection";

interface TextInputCardProps {
  originalText: string;
  setOriginalText: (text: string) => void;
  anonymizedText: string;
  showOriginal: boolean;
  setShowOriginal: (show: boolean) => void;
  copyToClipboard: (text: string, label: string) => void;
}

export const TextInputCard = ({
  originalText,
  setOriginalText,
  anonymizedText,
  showOriginal,
  setShowOriginal,
  copyToClipboard
}: TextInputCardProps) => {
  return (
    <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm shadow-xl shadow-slate-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-indigo-500/50"></div>
            Step 1: Paste Your Content
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(showOriginal ? originalText : anonymizedText, showOriginal ? 'Original text' : 'Anonymized text')}
              disabled={!originalText}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your content here. Any PII will be automatically detected and can be anonymized..."
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          className="min-h-[300px] bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        {originalText && !showOriginal && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50 shadow-inner">
            <div className="text-sm font-medium text-slate-200 mb-2">Anonymized Preview:</div>
            <div 
              className="text-slate-100 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightPII(anonymizedText) }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
