
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
  const [currentSelection, setCurrentSelection] = useState({ start: 0, end: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setHasSelection(start !== end);
      setCurrentSelection({ start, end });
    }
  };

  const handleAnonymize = (piiType: string) => {
    if (!textareaRef.current) return;
    
    const start = currentSelection.start;
    const end = currentSelection.end;
    
    if (start === end) return;
    
    // Get the selected text from the current text in the textarea
    const selectedText = originalText.substring(start, end);
    const placeholder = `[${piiType.toUpperCase()}_MANUAL_${Date.now()}]`;
    
    // Replace the selected text with the placeholder
    const newText = originalText.substring(0, start) + placeholder + originalText.substring(end);
    setOriginalText(newText);
    
    // Notify parent about manual anonymization
    if (onManualAnonymization) {
      onManualAnonymization(piiType, selectedText);
    }
    
    // Clear selection and position cursor after the placeholder
    setHasSelection(false);
    setCurrentSelection({ start: 0, end: 0 });
    
    // Focus and position cursor after the replacement
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = start + placeholder.length;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Display original text in textarea for manual selection, regardless of showOriginal state
  const displayText = originalText;

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
              onClick={() => pasteFromClipboard(setOriginalText, 'Content')}
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
            value={displayText}
            onChange={(e) => setOriginalText(e.target.value)}
            onSelect={handleSelectionChange}
            onMouseUp={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            className="min-h-[300px] bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30 transition-all"
          />
        </PiiContextMenu>
        {originalText && !showOriginal && (
          <div className="mt-4 p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-md border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5 animate-pulse"></div>
            <div className="relative flex justify-between items-center mb-3">
              <div className="text-sm font-semibold text-emerald-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Anonymized Preview:
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(anonymizedText, 'Anonymized text')}
                className="h-8 px-3 hover:bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 backdrop-blur-sm transition-all hover:scale-105"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative text-sm leading-relaxed whitespace-pre-wrap text-gray-200 bg-black/20 rounded-lg p-4 border border-white/10">
              {anonymizedText}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
