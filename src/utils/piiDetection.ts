
import { PiiPatterns, PiiMappings } from '@/types/pii';

// Curated list of TLDs for global company domains
const COMPANY_TLDS = [
  'com', 'org', 'net', 'biz', 'info', 'edu', // Common gTLDs
  'co', 'io', 'tech', 'app', 'dev', 'shop', 'ai', 'cloud', 'store', 'online', // Tech/branding
  'uk', 'de', 'jp', 'cn', 'br', 'au', 'ca', 'fr', 'in', 'kr', 'nl', 'es', 'it', 'ru', // ccTLDs
  'co.uk', 'co.jp', 'com.br', // Multi-level TLDs
  'global', 'company' // Company-focused
];

// Optimized PII patterns with dynamic company TLDs
export const PII_PATTERNS: PiiPatterns = {
  name: {
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/gi,
    color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
    placeholder: 'NAME'
  },
  email: {
    pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,6}\b/g,
    color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    placeholder: 'EMAIL'
  },
  phone: {
    pattern: /\b(\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    color: 'bg-[#1F6E8C]/20 text-blue-200 border-blue-400/40',
    placeholder: 'PHONE'
  },
  address: {
    pattern: /\b\d{1,5} \w+ (Street|St|Avenue|Ave|Road|Rd)\b/gi,
    color: 'bg-[#2E8A99]/20 text-cyan-200 border-cyan-400/40',
    placeholder: 'ADDRESS'
  },
  creditCard: {
    pattern: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
    color: 'bg-[#84A7A1]/20 text-green-200 border-green-400/40',
    placeholder: 'CREDIT_CARD'
  },
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    color: 'bg-[#0E2954]/20 text-blue-200 border-blue-400/40',
    placeholder: 'SSN'
  },
  website: {
    pattern: /\bhttps?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    color: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    placeholder: 'WEBSITE'
  },
  subdomain: {
    pattern: /\bhttps?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\.[a-z]{2,6}\b(?:\/[^\s]*)?/g,
    color: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    placeholder: 'SUBDOMAIN'
  },
  ipAddress: {
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    color: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
    placeholder: 'IP_ADDRESS'
  },
  company: {
    pattern: new RegExp(`\\b[\\w\\.-]+\\.(${COMPANY_TLDS.join('|').replace(/\./g, '\\.')})\\b`, 'gi'),
    color: 'bg-orange-500/20 text-orange-200 border-orange-400/40',
    placeholder: 'COMPANY'
  },
  port: {
    pattern: /\b(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])\b/g,
    color: 'bg-red-500/20 text-red-200 border-red-400/40',
    placeholder: 'PORT'
  }
};

/**
 * Anonymizes PII in text by replacing matches with placeholders
 * @param text Input text to anonymize
 * @param selectedTypes Optional array of PII types to process
 * @returns Object containing anonymized text and mappings
 */
export const anonymizeText = (text: string, selectedTypes?: string[]) => {
  if (typeof text !== 'string') {
    throw new Error('Input text must be a string');
  }

  let processedText = text;
  const mappings: PiiMappings = {};
  const counters: { [key: string]: number } = {};

  // Define processing order to avoid overlaps
  const typeOrder = [
    'subdomain',
    'website',
    'company',
    'name',
    'email',
    'phone',
    'address',
    'creditCard',
    'ssn',
    'ipAddress',
    'port'
  ];

  // Filter valid types or use all if none provided, respecting order
  const typesToProcess = selectedTypes?.length
    ? selectedTypes.filter(type => PII_PATTERNS[type]).sort((a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b))
    : typeOrder;

  typesToProcess.forEach(type => {
    const { pattern, placeholder } = PII_PATTERNS[type];
    counters[type] = 0;

    processedText = processedText.replace(pattern, (match) => {
      counters[type]++;
      const key = `[${placeholder}_${counters[type]}]`;
      mappings[key] = match;
      return key;
    });
  });

  return {
    anonymizedText: processedText,
    mappings
  };
};

/**
 * Reidentifies text by replacing placeholders with original values
 * @param text Anonymized text
 * @param mappings Mapping of placeholders to original values
 * @returns Reidentified text
 */
export const reidentifyText = (text: string, mappings: Record<string, string>) => {
  if (typeof text !== 'string') {
    throw new Error('Input text must be a string');
  }
  if (!mappings || typeof mappings !== 'object') {
    throw new Error('Mappings must be a valid object');
  }

  let reidentifiedText = text;
  Object.entries(mappings).forEach(([placeholder, original]) => {
    // Escape special characters in placeholder for regex
    const escapedKey = placeholder.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedKey, 'g');
    reidentifiedText = reidentifiedText.replace(regex, original);
  });
  return reidentifiedText;
};

/**
 * Highlights PII in text with styled spans
 * @param text Input text to highlight
 * @param maxMatches Maximum number of matches to process (default: 1000)
 * @returns HTML string with highlighted PII
 */
export const highlightPII = (text: string, maxMatches: number = 1000) => {
  if (typeof text !== 'string') {
    return text;
  }

  let highlightedText = text;
  let matchCount = 0;

  // Define processing order to avoid overlaps
  const typeOrder = [
    'subdomain',
    'website',
    'company',
    'name',
    'email',
    'phone',
    'address',
    'creditCard',
    'ssn',
    'ipAddress',
    'port'
  ];

  // Process patterns in order, stop if maxMatches reached
  typeOrder.every(type => {
    const config = PII_PATTERNS[type];
    highlightedText = highlightedText.replace(config.pattern, (match) => {
      if (matchCount >= maxMatches) return match;
      matchCount++;
      return `<span class="px-1 py-0.5 rounded border ${config.color}">${match}</span>`;
    });
    return matchCount < maxMatches;
  });

  return highlightedText;
};
