
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
    <Card className="bg-[#44444c]/60 border-[#8c8c8c]/50 backdrop-blur-sm shadow-xl shadow-[#0b0909]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#d6d6d6] flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            Step 1: Paste Your Content
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-[#8c8c8c] hover:text-white hover:bg-[#8c8c8c]/50"
            >
              {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(showOriginal ? originalText : anonymizedText, showOriginal ? 'Original text' : 'Anonymized text')}
              disabled={!originalText}
              className="text-[#8c8c8c] hover:text-white hover:bg-[#8c8c8c]/50"
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
          className="min-h-[300px] bg-[#0b0909]/50 border-[#8c8c8c]/50 text-[#d6d6d6] placeholder:text-[#8c8c8c] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
        {originalText && !showOriginal && (
          <div className="mt-4 p-4 bg-[#0b0909]/50 rounded-lg border border-[#8c8c8c]/50 shadow-inner">
            <div className="text-sm font-medium text-[#d6d6d6] mb-2">Anonymized Preview:</div>
            <div 
              className="text-[#d6d6d6] text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightPII(anonymizedText) }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
