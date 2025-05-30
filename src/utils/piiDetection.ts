
import { PiiPatterns } from '@/types/pii';

export const PII_PATTERNS: PiiPatterns = {
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    color: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
    placeholder: 'SSN'
  },
  creditCard: {
    pattern: /\b(?:\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{6}[-\s]?\d{5})\b/g,
    color: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    placeholder: 'CARD'
  },
  phone: {
    pattern: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
    color: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
    placeholder: 'PHONE'
  },
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    placeholder: 'EMAIL'
  },
  address: {
    pattern: /\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Place|Pl|Court|Ct|Way)\b/gi,
    color: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
    placeholder: 'ADDRESS'
  },
  name: {
    pattern: /\b[A-Z][a-z]{2,}\s+[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]{2,})?\b/g,
    color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
    placeholder: 'NAME'
  }
};

export const anonymizeText = (text: string) => {
  let anonymizedText = text;
  const newMappings: Record<string, string> = {};
  const counters: Record<string, number> = {};

  // Process patterns in order of specificity (most specific first)
  Object.entries(PII_PATTERNS).forEach(([type, config]) => {
    counters[type] = 1;
    anonymizedText = anonymizedText.replace(config.pattern, (match) => {
      const placeholder = `[${config.placeholder}_${counters[type]}]`;
      newMappings[placeholder] = match;
      counters[type]++;
      return placeholder;
    });
  });

  return { anonymizedText, mappings: newMappings };
};

export const reidentifyText = (text: string, mappings: Record<string, string>) => {
  let reidentifiedText = text;
  Object.entries(mappings).forEach(([placeholder, original]) => {
    reidentifiedText = reidentifiedText.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), original);
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
