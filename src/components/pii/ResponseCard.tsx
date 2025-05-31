
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
    <Card className="shadow-xl" style={{ backgroundColor: '#fafafa', borderColor: '#ccc' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle style={{ color: 'darkgray' }} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: '#249CFF' }}></div>
            Step 2: Paste AI Response
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
            disabled={!aiResponse}
            className="hover:bg-gray-100"
            style={{ color: 'darkgray' }}
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
          className="min-h-[300px] text-black placeholder:text-gray-500 focus:ring-2 transition-all"
          style={{ backgroundColor: 'white', borderColor: '#ccc', focusRingColor: '#249CFF' }}
        />
        {aiResponse && (
          <div className="mt-4 p-4 rounded-lg border shadow-inner" style={{ backgroundColor: 'white', borderColor: '#ccc' }}>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium" style={{ color: 'darkgray' }}>Re-identified Preview:</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
                className="h-6 px-2 hover:bg-gray-100"
                style={{ color: 'darkgray' }}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'darkgray' }}>
              {reidentifiedResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
