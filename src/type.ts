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
