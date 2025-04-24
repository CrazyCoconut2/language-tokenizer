export enum ParsedElementType {
    WORD = 'WORD',
    PUNCTUATION = 'PUNCTUATION',
    WHITESPACE = 'WHITESPACE',
}

export type ParsedElement = {
    type: ParsedElementType;
    text?: string;
    metadata?: any;
};


export enum LANGUAGES {
    en,
    es,
    fr,
    pr,
    it,
    de,
    po,
    sv,
    da,
    nw,
    // Add more languages as we progress
  }

export type LANGUAGE = keyof typeof LANGUAGES;