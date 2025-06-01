
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
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
            Step 1: Paste Your Content
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="hover:bg-white/10 text-white"
            >
              {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(showOriginal ? originalText : anonymizedText, showOriginal ? 'Original text' : 'Anonymized text')}
              disabled={!originalText}
              className="hover:bg-white/10 text-white"
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
          className="min-h-[300px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30 transition-all"
        />
        {originalText && !showOriginal && (
          <div className="mt-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 shadow-inner">
            <div className="text-sm font-medium mb-2 text-gray-300">Anonymized Preview:</div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
              {anonymizedText}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
