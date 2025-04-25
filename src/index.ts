import { ParsedElement, ParsedElementType } from "./type";
import { LANGUAGE_CODE } from 'languages-utils';

export function getRegexForLanguage(languageCode: LANGUAGE_CODE) {
    switch (languageCode) {
      case 'en':
        return /^[\w']+$/;
      case 'fr':
        return /^[\p{L}\p{M}']+$/u;
      case 'es':
        return /^[\p{L}\p{M}']+$/u;
      case 'it':
        return /^[\p{L}\p{M}']+$/u;
      case 'pt':
        return /^[\p{L}\p{M}']+$/u;
      case 'po':
        return /^[\p{L}\p{M}']+$/u;
      case 'sv':
        return /^[\p{L}\p{M}']+$/u;
      default:
        return /^[\p{L}\p{M}']+$/u;
    }
  }
  
  export function splitTextIntoElements(sentence: string) {
    return sentence.split(/(<br>|[\[\].,!?\-;:"() ]|(?<=\s)|(?=\s))/g);
  }
  
  export function parseElementsInDialog(dialog: string, languageCode: LANGUAGE_CODE): ParsedElement[] {
    const parts = splitTextIntoElements(dialog);
  
    return parts
      .flatMap((part: any) => {
        if (!part) return [];
        if (part === '<br>' || part === ' ') {
          return { type: ParsedElementType.WHITESPACE };
        }
  
        const elementsWithHyphens = part.split(/(?<=\w)(-)(?=\w)/g);
        const wordRegex = getRegexForLanguage(language);
        return elementsWithHyphens.map((subElement: any) => {
          const isWord = wordRegex.test(subElement);
          return {
            type: isWord ? ParsedElementType.WORD : ParsedElementType.PUNCTUATION,
            text: subElement,
          };
        });
      })
      .filter((item: any) => 'text' in item ? item.text !== '' : true);
  }
  