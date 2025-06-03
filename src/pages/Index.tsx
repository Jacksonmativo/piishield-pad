import { useState, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { anonymizeText, reidentifyText, PII_PATTERNS } from '@/utils/piiDetection';
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
  const [manualPiiMappings, setManualPiiMappings] = useState<PiiMappings>({});
  const [showOriginal, setShowOriginal] = useState(true);
  const [selectedPiiTypes, setSelectedPiiTypes] = useState<string[]>([]);
  const { toast } = useToast();

  // Get anonymized version of original text
  const anonymizedText = useMemo(() => {
    if (!originalText) return '';
    const result = anonymizeText(originalText, selectedPiiTypes);
    setPiiMappings(result.mappings);
    return result.anonymizedText;
  }, [originalText, selectedPiiTypes]);

  // Combine auto-detected and manual PII mappings
  const allPiiMappings = useMemo(() => {
    return { ...piiMappings, ...manualPiiMappings };
  }, [piiMappings, manualPiiMappings]);

  // Get re-identified version of AI response
  const reidentifiedResponse = useMemo(() => {
    return aiResponse ? reidentifyText(aiResponse, allPiiMappings) : '';
  }, [aiResponse, allPiiMappings]);

  const handleManualAnonymization = useCallback((type: string, originalValue: string) => {
    const placeholder = `[${type.toUpperCase()}_MANUAL_${Date.now()}]`;
    setManualPiiMappings(prev => ({
      ...prev,
      [placeholder]: originalValue
    }));
    
    toast({
      title: "Manual anonymization added",
      description: `"${originalValue}" anonymized as ${type.toUpperCase()}`,
    });
  }, [toast]);

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
    setManualPiiMappings({});
    toast({
      title: "Reset complete",
      description: "All data cleared and mappings reset",
    });
  };

  const detectedPIICount = Object.keys(allPiiMappings).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Privacy Disclaimer */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 shadow-xl">
          <p className="text-sm text-blue-100 text-center font-medium">
            This app does not store or transmit your data. All processing happens in your browser.
          </p>
        </div>
        
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
            onManualAnonymization={handleManualAnonymization}
          />

          <ResponseCard
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            reidentifiedResponse={reidentifiedResponse}
            copyToClipboard={copyToClipboard}
          />
        </div>

        <PiiMappingsDisplay piiMappings={allPiiMappings} />

        <ActionButtons resetAll={resetAll} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
