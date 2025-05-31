
import { useState, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { anonymizeText, reidentifyText } from '@/utils/piiDetection';
import { PiiMappings } from '@/types/pii';
import { Header } from '@/components/pii/Header';
import { StatsBar } from '@/components/pii/StatsBar';
import { TextInputCard } from '@/components/pii/TextInputCard';
import { ResponseCard } from '@/components/pii/ResponseCard';
import { PiiMappingsDisplay } from '@/components/pii/PiiMappingsDisplay';
import { ActionButtons } from '@/components/pii/ActionButtons';
import { PiiTypeSelector } from '@/components/pii/PiiTypeSelector';
import { Footer } from '@/components/pii/Footer';

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [piiMappings, setPiiMappings] = useState<PiiMappings>({});
  const [showOriginal, setShowOriginal] = useState(true);
  const [selectedPiiTypes, setSelectedPiiTypes] = useState<string[]>([
    'NAME', 'EMAIL', 'PHONE', 'ADDRESS', 'CREDIT_CARD', 'SSN'
  ]);
  const { toast } = useToast();

  // Get anonymized version of original text
  const anonymizedText = useMemo(() => {
    if (!originalText) return '';
    const result = anonymizeText(originalText, selectedPiiTypes);
    setPiiMappings(result.mappings);
    return result.anonymizedText;
  }, [originalText, selectedPiiTypes]);

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
    <div className="min-h-screen bg-gradient-to-br from-[#0b0909] via-[#44444c] to-[#8c8c8c] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#44444c]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-96 h-96 bg-[#8c8c8c]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-[#d6d6d6]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <StatsBar detectedPIICount={detectedPIICount} showOriginal={showOriginal} />

        <PiiTypeSelector 
          selectedTypes={selectedPiiTypes}
          onSelectionChange={setSelectedPiiTypes}
        />

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

        <PiiMappingsDisplay piiMappings={piiMappings} />

        <ActionButtons resetAll={resetAll} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
