
export interface PiiPattern {
  pattern: RegExp;
  color: string;
  placeholder: string;
}

export interface PiiMappings {
  [placeholder: string]: string;
}

export interface PiiPatterns {
  [key: string]: PiiPattern;
}
