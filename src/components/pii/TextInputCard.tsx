import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Eye, EyeOff, Clipboard } from "lucide-react";
import { useState, useRef } from "react";
import { PiiContextMenu } from "./PiiContextMenu";

interface TextInputCardProps {
  originalText: string;
  setOriginalText: (text: string) => void;
  anonymizedText: string;
  showOriginal: boolean;
  setShowOriginal: (show: boolean) => void;
  copyToClipboard: (text: string, label: string) => void;
  pasteFromClipboard: (setter: (text: string) => void, label: string) => void;
  onManualAnonymization?: (type: string, originalValue: string) => void;
}

export const TextInputCard = ({
  originalText,
  setOriginalText,
  anonymizedText,
  showOriginal,
  setShowOriginal,
  copyToClipboard,
  pasteFromClipboard,
  onManualAnonymization
}: TextInputCardProps) => {
  const [hasSelection, setHasSelection] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelectionStart(start);
      setSelectionEnd(end);
      setHasSelection(start !== end);
    }
  };

  const handleAnonymize = (piiType: string) => {
    if (!textareaRef.current || selectionStart === selectionEnd) return;
    
    const selectedText = originalText.substring(selectionStart, selectionEnd);
    const placeholder = `[${piiType.toUpperCase()}_MANUAL_${Date.now()}]`;
    
    // Replace only the selected portion of text
    const newText = originalText.substring(0, selectionStart) + placeholder + originalText.substring(selectionEnd);
    setOriginalText(newText);
    
    // Notify parent about manual anonymization
    if (onManualAnonymization) {
      onManualAnonymization(piiType, selectedText);
    }
    
    // Clear selection and position cursor after the placeholder
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = selectionStart + placeholder.length;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        textareaRef.current.focus();
        setHasSelection(false);
      }
    }, 0);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
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
              onClick={() => pasteFromClipboard(setOriginalText, 'Original text')}
              className="hover:bg-white/10 text-white"
            >
              <Clipboard className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="hover:bg-white/10 text-white"
            >
              {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <PiiContextMenu onAnonymize={handleAnonymize} hasSelection={hasSelection}>
          <Textarea
            ref={textareaRef}
            placeholder="Paste your content here. Highlight text and right-click to anonymize specific parts, or let the system auto-detect PII..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            onSelect={handleSelectionChange}
            onMouseUp={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            className="min-h-[300px] bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30 transition-all"
          />
        </PiiContextMenu>
        {originalText && !showOriginal && (
          <div className="mt-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-300">Anonymized Preview:</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(anonymizedText, 'Anonymized text')}
                className="h-6 px-2 hover:bg-white/10 text-gray-300 border border-white/20"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere text-gray-300 word-break-break-all">
              {anonymizedText}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};