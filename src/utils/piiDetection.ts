
import { PiiPatterns } from '@/types/pii';

export const PII_PATTERNS: PiiPatterns = {
  name: {
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
    color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
    placeholder: 'NAME'
  },
  email: {
    pattern: /\b[\w\.-]+@[\w\.-]+\.\w+\b/g,
    color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    placeholder: 'EMAIL'
  },
  phone: {
    pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    color: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
    placeholder: 'PHONE'
  },
  address: {
    pattern: /\b\d{1,5} \w+ (Street|St|Avenue|Ave|Road|Rd)\b/g,
    color: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
    placeholder: 'ADDRESS'
  },
  creditCard: {
    pattern: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
    color: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    placeholder: 'CREDIT_CARD'
  },
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    color: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
    placeholder: 'SSN'
  }
};

export const anonymizeText = (text: string) => {
  let anonymizedText = text;
  const newMappings: Record<string, string> = {};
  const indexMap: Record<string, number> = {};

  // Process each pattern type
  Object.entries(PII_PATTERNS).forEach(([type, config]) => {
    anonymizedText = anonymizedText.replace(config.pattern, (match) => {
      if (!indexMap[type]) indexMap[type] = 0;
      indexMap[type]++;
      const placeholder = `[${config.placeholder}_${indexMap[type]}]`;
      newMappings[placeholder] = match;
      return placeholder;
    });
  });

  return { anonymizedText, mappings: newMappings };
};

export const reidentifyText = (text: string, mappings: Record<string, string>) => {
  let reidentifiedText = text;
  Object.entries(mappings).forEach(([placeholder, original]) => {
    const escapedKey = placeholder.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'g');
    reidentifiedText = reidentifiedText.replace(regex, original);
  });
  return reidentifiedText;
};

export const highlightPII = (text: string) => {
  let highlightedText = text;
  Object.entries(PII_PATTERNS).forEach(([type, config]) => {
    highlightedText = highlightedText.replace(config.pattern, (match) => {
      return `<span class="px-1 py-0.5 rounded border ${config.color}">${match}</span>`;
    });
  });
  return highlightedText;
};
