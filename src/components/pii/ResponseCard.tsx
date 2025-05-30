
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
    <Card className="bg-slate-900/60 border-slate-700/50 backdrop-blur-sm shadow-xl shadow-slate-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            Step 3: Paste AI Response
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
            disabled={!aiResponse}
            className="text-slate-300 hover:text-white hover:bg-slate-700/50"
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
          className="min-h-[300px] bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        {aiResponse && (
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50 shadow-inner">
            <div className="text-sm font-medium text-slate-200 mb-2">Re-identified Preview:</div>
            <div className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">
              {reidentifiedResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
