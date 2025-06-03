
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Clipboard } from "lucide-react";

interface ResponseCardProps {
  aiResponse: string;
  setAiResponse: (response: string) => void;
  reidentifiedResponse: string;
  copyToClipboard: (text: string, label: string) => void;
  pasteFromClipboard: (setter: (text: string) => void, label: string) => void;
}

export const ResponseCard = ({
  aiResponse,
  setAiResponse,
  reidentifiedResponse,
  copyToClipboard,
  pasteFromClipboard
}: ResponseCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
            Step 2: Paste AI Response
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => pasteFromClipboard(setAiResponse, 'AI Response')}
            className="hover:bg-white/10 text-white"
          >
            <Clipboard className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste the AI's response here. Any anonymized placeholders will be automatically restored to original PII..."
          value={aiResponse}
          onChange={(e) => setAiResponse(e.target.value)}
          className="min-h-[300px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30 transition-all"
        />
        {aiResponse && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-purple-200">Re-identified Preview:</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
                className="h-6 px-2 hover:bg-purple-500/20 text-purple-200 border border-purple-500/30"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
              {reidentifiedResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
