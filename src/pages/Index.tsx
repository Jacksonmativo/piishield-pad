
import { useState, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";

// PII detection patterns
const PII_PATTERNS = {
  name: {
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b/g,
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    placeholder: 'NAME'
  },
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    color: 'bg-green-500/20 text-green-300 border-green-500/30',
    placeholder: 'EMAIL'
  },
  phone: {
    pattern: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    placeholder: 'PHONE'
  },
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    color: 'bg-red-500/20 text-red-300 border-red-500/30',
    placeholder: 'SSN'
  },
  creditCard: {
    pattern: /\b(?:\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{6}[-\s]?\d{5})\b/g,
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    placeholder: 'CARD'
  },
  address: {
    pattern: /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Place|Pl|Court|Ct|Way)\b/gi,
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    placeholder: 'ADDRESS'
  }
};

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [piiMappings, setPiiMappings] = useState<Record<string, string>>({});
  const [showOriginal, setShowOriginal] = useState(true);
  const { toast } = useToast();

  // Detect and anonymize PII
  const anonymizeText = useCallback((text: string) => {
    let anonymizedText = text;
    const newMappings: Record<string, string> = {};
    const counters: Record<string, number> = {};

    Object.entries(PII_PATTERNS).forEach(([type, config]) => {
      counters[type] = 1;
      anonymizedText = anonymizedText.replace(config.pattern, (match) => {
        const placeholder = `[${config.placeholder}_${counters[type]}]`;
        newMappings[placeholder] = match;
        counters[type]++;
        return placeholder;
      });
    });

    setPiiMappings(newMappings);
    return anonymizedText;
  }, []);

  // Re-identify PII in AI response
  const reidentifyText = useCallback((text: string) => {
    let reidentifiedText = text;
    Object.entries(piiMappings).forEach(([placeholder, original]) => {
      reidentifiedText = reidentifiedText.replace(new RegExp(placeholder, 'g'), original);
    });
    return reidentifiedText;
  }, [piiMappings]);

  // Get anonymized version of original text
  const anonymizedText = useMemo(() => {
    return originalText ? anonymizeText(originalText) : '';
  }, [originalText, anonymizeText]);

  // Get re-identified version of AI response
  const reidentifiedResponse = useMemo(() => {
    return aiResponse ? reidentifyText(aiResponse) : '';
  }, [aiResponse, reidentifyText]);

  // Highlight PII in text
  const highlightPII = useCallback((text: string) => {
    let highlightedText = text;
    Object.entries(PII_PATTERNS).forEach(([type, config]) => {
      highlightedText = highlightedText.replace(config.pattern, (match) => {
        return `<span class="px-1 py-0.5 rounded border ${config.color}">${match}</span>`;
      });
    });
    return highlightedText;
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${label} copied successfully`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const resetAll = () => {
    setOriginalText('');
    setAiResponse('');
    setPiiMappings({});
    toast({
      title: "Reset complete",
      description: "All data cleared and mappings reset",
    });
  };

  const detectedPIICount = Object.keys(piiMappings).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PII Shield
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Anonymize personal information for AI interactions, then restore it in the response.
            Keep your privacy while leveraging AI assistance.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 border-slate-700">
            <Shield className="w-4 h-4 mr-2" />
            {detectedPIICount} PII items detected
          </Badge>
          <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 border-slate-700">
            <Eye className="w-4 h-4 mr-2" />
            {showOriginal ? 'Original view' : 'Anonymized view'}
          </Badge>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Original Text Input */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  Step 1: Paste Your Content
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOriginal(!showOriginal)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    {showOriginal ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(showOriginal ? originalText : anonymizedText, showOriginal ? 'Original text' : 'Anonymized text')}
                    disabled={!originalText}
                    className="text-slate-400 hover:text-slate-200"
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
                className="min-h-[300px] bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-blue-500 transition-colors"
              />
              {originalText && !showOriginal && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="text-sm font-medium text-slate-300 mb-2">Anonymized Preview:</div>
                  <div 
                    className="text-slate-200 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightPII(anonymizedText) }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Response Input */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Step 3: Paste AI Response
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(reidentifiedResponse, 'Re-identified response')}
                  disabled={!aiResponse}
                  className="text-slate-400 hover:text-slate-200"
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
                className="min-h-[300px] bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus:border-purple-500 transition-colors"
              />
              {aiResponse && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="text-sm font-medium text-slate-300 mb-2">Re-identified Preview:</div>
                  <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                    {reidentifiedResponse}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Step 2 - Copy Anonymized Text */}
        <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">Step 2: Copy Anonymized Text</h3>
                  <p className="text-slate-400">Copy the anonymized version to share with AI safely</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-emerald-400" />
                <Button
                  onClick={() => copyToClipboard(anonymizedText, 'Anonymized text')}
                  disabled={!anonymizedText}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Anonymized
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PII Mappings Display */}
        {Object.keys(piiMappings).length > 0 && (
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Detected PII Mappings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(piiMappings).map(([placeholder, original]) => (
                  <div key={placeholder} className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="text-xs text-slate-400 mb-1">Placeholder</div>
                    <div className="text-sm text-blue-300 font-mono mb-2">{placeholder}</div>
                    <div className="text-xs text-slate-400 mb-1">Original</div>
                    <div className="text-sm text-slate-200 font-mono">{original}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={resetAll}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
