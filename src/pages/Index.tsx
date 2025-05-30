
import { useState, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { anonymizeText, reidentifyText } from '@/utils/piiDetection';
import { PiiMappings } from '@/types/pii';
import { Header } from '@/components/pii/Header';
import { StatsBar } from '@/components/pii/StatsBar';
import { TextInputCard } from '@/components/pii/TextInputCard';
import { ResponseCard } from '@/components/pii/ResponseCard';
import { CopyAnonymizedSection } from '@/components/pii/CopyAnonymizedSection';
import { PiiMappingsDisplay } from '@/components/pii/PiiMappingsDisplay';
import { ActionButtons } from '@/components/pii/ActionButtons';

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [piiMappings, setPiiMappings] = useState<PiiMappings>({});
  const [showOriginal, setShowOriginal] = useState(true);
  const { toast } = useToast();

  // Get anonymized version of original text
  const anonymizedText = useMemo(() => {
    if (!originalText) return '';
    const result = anonymizeText(originalText);
    setPiiMappings(result.mappings);
    return result.anonymizedText;
  }, [originalText]);

  // Get re-identified version of AI response
  const reidentifiedResponse = useMemo(() => {
    return aiResponse ? reidentifyText(aiResponse, piiMappings) : '';
  }, [aiResponse, piiMappings]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <StatsBar detectedPIICount={detectedPIICount} showOriginal={showOriginal} />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <TextInputCard
            originalText={originalText}
            setOriginalText={setOriginalText}
            anonymizedText={anonymizedText}
            showOriginal={showOriginal}
            setShowOriginal={setShowOriginal}
            copyToClipboard={copyToClipboard}
          />

          <ResponseCard
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            reidentifiedResponse={reidentifiedResponse}
            copyToClipboard={copyToClipboard}
          />
        </div>

        <CopyAnonymizedSection
          anonymizedText={anonymizedText}
          copyToClipboard={copyToClipboard}
        />

        <PiiMappingsDisplay piiMappings={piiMappings} />

        <ActionButtons resetAll={resetAll} />
      </div>
    </div>
  );
};

export default Index;
