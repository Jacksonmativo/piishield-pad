import { useState, useCallback, useEffect, useMemo } from 'react';
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
import { Shield, Lock } from 'lucide-react';

const Index = () => {
  const [originalText, setOriginalText] = useState('');
  const [anonymizedText, setAnonymizedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [piiMappings, setPiiMappings] = useState<PiiMappings>({});
  const [manualPiiMappings, setManualPiiMappings] = useState<PiiMappings>({});
  const [showOriginal, setShowOriginal] = useState(true);
  const [selectedPiiTypes, setSelectedPiiTypes] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!originalText || selectedPiiTypes.length === 0) {
      setAnonymizedText(originalText);
      setPiiMappings({});
      return;
    }

    const result = anonymizeText(originalText, selectedPiiTypes);
    let combinedText = result.anonymizedText;
    let combinedMappings = { ...result.mappings };

    for (const [placeholder, original] of Object.entries(manualPiiMappings)) {
      const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      combinedText = combinedText.replace(new RegExp(escaped, 'g'), placeholder);
      combinedMappings[placeholder] = original;
    }

    setAnonymizedText(combinedText);
    setPiiMappings(combinedMappings);
  }, [originalText, selectedPiiTypes, manualPiiMappings]);

  const allPiiMappings = useMemo(() => {
    return { ...piiMappings, ...manualPiiMappings };
  }, [piiMappings, manualPiiMappings]);

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

  const pasteFromClipboard = async (setter: (text: string) => void, label: string) => {
    try {
      const text = await navigator.clipboard.readText();
      setter(text);
      toast({
        title: "Pasted from clipboard",
        description: `${label} pasted successfully`,
      });
    } catch (err) {
      toast({
        title: "Failed to paste",
        description: "Please try again or paste manually",
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

        <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-md border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5 animate-pulse"></div>
          <div className="relative flex items-center justify-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/20 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-sm text-emerald-100 text-center font-medium tracking-wide">
              This app does not store or transmit your data. All processing happens in your browser.
            </p>
            <div className="p-2 rounded-full bg-blue-500/20 backdrop-blur-sm">
              <Lock className="w-5 h-5 text-blue-300" />
            </div>
          </div>
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
            pasteFromClipboard={pasteFromClipboard}
            onManualAnonymization={handleManualAnonymization}
          />

          <ResponseCard
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            reidentifiedResponse={reidentifiedResponse}
            copyToClipboard={copyToClipboard}
            pasteFromClipboard={pasteFromClipboard}
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
