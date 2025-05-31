
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
    <Card className="shadow-xl" style={{ backgroundColor: '#fafafa', borderColor: '#ccc' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle style={{ color: 'darkgray' }} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: '#249CFF' }}></div>
            Step 1: Paste Your Content
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="hover:bg-gray-100"
              style={{ color: 'darkgray' }}
            >
              {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(showOriginal ? originalText : anonymizedText, showOriginal ? 'Original text' : 'Anonymized text')}
              disabled={!originalText}
              className="hover:bg-gray-100"
              style={{ color: 'darkgray' }}
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
          className="min-h-[300px] text-black placeholder:text-gray-500 focus:ring-2 transition-all"
          style={{ backgroundColor: 'white', borderColor: '#ccc', focusRingColor: '#249CFF' }}
        />
        {originalText && !showOriginal && (
          <div className="mt-4 p-4 rounded-lg border shadow-inner" style={{ backgroundColor: 'white', borderColor: '#ccc' }}>
            <div className="text-sm font-medium mb-2" style={{ color: 'darkgray' }}>Anonymized Preview:</div>
            <div 
              className="text-sm leading-relaxed"
              style={{ color: 'darkgray' }}
              dangerouslySetInnerHTML={{ __html: highlightPII(anonymizedText) }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
