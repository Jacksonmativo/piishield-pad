
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface ResponseCardProps {
  aiResponse: string;
  setAiResponse: (response: string) => void;
  reidentifiedResponse: string;
  copyToClipboard: (text: string, label: string) => void;
}

export const ResponseCard = ({
  aiResponse,
  setAiResponse,
  reidentifiedResponse,
  copyToClipboard
}: ResponseCardProps) => {
  return (
    <Card className="bg-[#44444c]/60 border-[#8c8c8c]/50 backdrop-blur-sm shadow-xl shadow-[#0b0909]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#d6d6d6] flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            Step 2: Paste AI Response
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
            disabled={!aiResponse}
            className="text-[#8c8c8c] hover:text-white hover:bg-[#8c8c8c]/50"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste the AI's response here. Any anonymized placeholders will be automatically restored to original PII..."
          value={aiResponse}
          onChange={(e) => setAiResponse(e.target.value)}
          className="min-h-[300px] bg-[#0b0909]/50 border-[#8c8c8c]/50 text-[#d6d6d6] placeholder:text-[#8c8c8c] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        {aiResponse && (
          <div className="mt-4 p-4 bg-[#0b0909]/50 rounded-lg border border-[#8c8c8c]/50 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-[#d6d6d6]">Re-identified Preview:</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
                className="text-[#8c8c8c] hover:text-white hover:bg-[#8c8c8c]/50 h-6 px-2"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-[#d6d6d6] text-sm leading-relaxed whitespace-pre-wrap">
              {reidentifiedResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
