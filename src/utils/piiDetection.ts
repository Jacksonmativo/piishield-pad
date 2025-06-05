
import { PiiPatterns, PiiMappings } from '@/types/pii';

// Curated list of TLDs for global company domains
const COMPANY_TLDS = [
  'com', 'org', 'net', 'biz', 'info', 'edu', // Common gTLDs
  'co', 'io', 'tech', 'app', 'dev', 'shop', 'ai', 'cloud', 'store', 'online', // Tech/branding
  'uk', 'de', 'jp', 'cn', 'br', 'au', 'ca', 'fr', 'in', 'kr', 'nl', 'es', 'it', 'ru', // ccTLDs
  'co.uk', 'co.jp', 'com.br', // Multi-level TLDs
  'global', 'company' // Company-focused
];

// International calling codes
const CALLING_CODES = [
  '93', '355', '213', '1-684', '376', '244', '1-264', '672', '1-268', '54', '374', '297', '61', '43', '994', '1-242', '973', '880', '1-246', '375', '32', '501', '229', '1-441', '975', '591', '387', '267', '55', '246', '1-284', '673', '359', '226', '257', '855', '237', '1', '238', '599', '1-345', '236', '235', '56', '86', '61', '61', '57', '269', '243', '242', '682', '506', '385', '53', '599', '357', '420', '45', '253', '1-767', '1-809', '593', '20', '503', '240', '291', '372', '268', '251', '500', '298', '679', '358', '33', '594', '689', '241', '220', '995', '49', '233', '350', '30', '299', '1-473', '590', '1-671', '502', '44-1481', '224', '245', '592', '509', '504', '852', '36', '354', '91', '62', '98', '964', '353', '44-1624', '972', '39', '225', '1-876', '81', '44-1534', '962', '7', '254', '686', '383', '965', '996', '856', '371', '961', '266', '231', '218', '423', '370', '352', '853', '261', '265', '60', '960', '223', '356', '692', '596', '222', '230', '262', '52', '691', '373', '377', '976', '382', '1-664', '212', '258', '95', '264', '674', '977', '31', '687', '64', '505', '227', '234', '683', '672', '850', '389', '1-670', '47', '968', '92', '680', '970', '507', '675', '595', '51', '63', '48', '351', '1-787', '974', '262', '40', '7', '250', '590', '290', '1-869', '1-758', '590', '508', '1-784', '685', '378', '239', '966', '221', '381', '248', '232', '65', '1-721', '421', '386', '677', '252', '27', '82', '211', '34', '94', '249', '597', '46', '41', '963', '886', '992', '255', '66', '670', '228', '690', '676', '1-868', '216', '90', '993', '1-649', '688', '1-340', '256', '380', '971', '44', '1', '598', '998', '678', '39', '58', '84', '681', '212', '967', '260', '263'
];

// Create escaped calling codes pattern for regex
const escapedCallingCodes = CALLING_CODES.map(code => code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

// Optimized PII patterns with resolved email/company and website/subdomain conflicts
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
    pattern: new RegExp(`\\b(\\+(${escapedCallingCodes})[-\\.\\s]?)?\\d{3}[-\\.\\s]?\\d{3}[-\\.\\s]?\\d{4}\\b`, 'g'),
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
    pattern: /\b(?:(?:https?:\/\/)?(?![a-zA-Z0-9-]*\.?www\.)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\.[a-z]{2,6}\b)(?:\/[^\s]*)?/g,
    color: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    placeholder: 'SUBDOMAIN'
  },
  ipAddress: {
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    color: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
    placeholder: 'IP_ADDRESS'
  },
  company: {
    pattern: new RegExp(`\\b(?<!@[\\w\\.-]*)[\\w\\.-]+\\.(${COMPANY_TLDS.join('|').replace(/\./g, '\\.')})\\b`, 'gi'),
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
    'email',
    'company',
    'name',
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
    'email',
    'company',
    'name',
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
