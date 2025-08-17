import { getRegexForLanguage, splitTextIntoElements, parseElementsInDialog } from '../src/index';
import { ParsedElementType } from '../src/type';

describe('Language Tokenizer', () => {
  describe('getRegexForLanguage', () => {
    it('should return correct regex for English', () => {
      const regex = getRegexForLanguage('en');
      expect(regex.source).toBe('^[\\w\']+$');
    });

    it('should return correct regex for French', () => {
      const regex = getRegexForLanguage('fr');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return correct regex for Spanish', () => {
      const regex = getRegexForLanguage('es');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return correct regex for Italian', () => {
      const regex = getRegexForLanguage('it');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return correct regex for Portuguese', () => {
      const regex = getRegexForLanguage('pt');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return correct regex for Polish', () => {
      const regex = getRegexForLanguage('pl');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return correct regex for Swedish', () => {
      const regex = getRegexForLanguage('sv');
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });

    it('should return default regex for unsupported language', () => {
      const regex = getRegexForLanguage('de' as any);
      expect(regex.source).toBe('^[\\p{L}\\p{M}\']+$');
      expect(regex.flags).toBe('u');
    });
  });

  describe('splitTextIntoElements', () => {
    it('should split simple sentence correctly', () => {
      const result = splitTextIntoElements('Hello world!');
      expect(result).toEqual(['Hello', ' ', 'world', '!', '']);
    });

    it('should handle punctuation correctly', () => {
      const result = splitTextIntoElements('Hello, world! How are you?');
      expect(result).toEqual(['Hello', ',', '', ' ', 'world', '!', '', ' ', 'How', ' ', 'are', ' ', 'you', '?', '']);
    });

    it('should handle line breaks', () => {
      const result = splitTextIntoElements('Hello<br>world');
      expect(result).toEqual(['Hello', '<br>', 'world']);
    });

    it('should handle parentheses and brackets', () => {
      const result = splitTextIntoElements('Hello (world) [test]');
      expect(result).toEqual(['Hello', ' ', '', '(', 'world', ')', '', ' ', '', '[', 'test', ']', '']);
    });

    it('should handle quotes and colons', () => {
      const result = splitTextIntoElements('He said: "Hello world"');
      expect(result).toEqual(['He', ' ', 'said', ':', '', ' ', '', '"', 'Hello', ' ', 'world', '"', '']);
    });

    it('should handle empty string', () => {
      const result = splitTextIntoElements('');
      expect(result).toEqual(['']);
    });

    it('should handle single word', () => {
      const result = splitTextIntoElements('Hello');
      expect(result).toEqual(['Hello']);
    });
  });

  describe('parseElementsInDialog', () => {
    describe('English (en)', () => {
      it('should parse simple English sentence', () => {
        const result = parseElementsInDialog('Hello world!', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Hello' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'world' },
          { type: ParsedElementType.PUNCTUATION, text: '!' }
        ]);
      });

      it('should handle contractions in English', () => {
        const result = parseElementsInDialog("Don't worry, it's fine.", 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: "Don't" },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'worry' },
          { type: ParsedElementType.PUNCTUATION, text: ',' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: "it's" },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'fine' },
          { type: ParsedElementType.PUNCTUATION, text: '.' }
        ]);
      });

      it('should handle hyphens in English', () => {
        const result = parseElementsInDialog('self-driving car', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'self' },
          { type: ParsedElementType.PUNCTUATION, text: '-' },
          { type: ParsedElementType.WORD, text: 'driving' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'car' }
        ]);
      });
    });

    describe('French (fr)', () => {
      it('should parse French sentence with accents', () => {
        const result = parseElementsInDialog('Bonjour, comment allez-vous?', 'fr');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Bonjour' },
          { type: ParsedElementType.PUNCTUATION, text: ',' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'comment' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'allez' },
          { type: ParsedElementType.PUNCTUATION, text: '-' },
          { type: ParsedElementType.WORD, text: 'vous' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });

      it('should handle French contractions', () => {
        const result = parseElementsInDialog("C'est l'été!", 'fr');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: "C'est" },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: "l'été" },
          { type: ParsedElementType.PUNCTUATION, text: '!' }
        ]);
      });
    });

    describe('Spanish (es)', () => {
      it('should parse Spanish sentence with special characters', () => {
        const result = parseElementsInDialog('¡Hola! ¿Cómo estás?', 'es');
        expect(result).toEqual([
          { type: ParsedElementType.PUNCTUATION, text: '¡Hola' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.PUNCTUATION, text: '¿Cómo' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'estás' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });

      it('should handle Spanish contractions', () => {
        const result = parseElementsInDialog('Vamos al parque.', 'es');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Vamos' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'al' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'parque' },
          { type: ParsedElementType.PUNCTUATION, text: '.' }
        ]);
      });
    });

    describe('Italian (it)', () => {
      it('should parse Italian sentence', () => {
        const result = parseElementsInDialog('Ciao! Come stai?', 'it');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Ciao' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Come' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'stai' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });
    });

    describe('Portuguese (pt)', () => {
      it('should parse Portuguese sentence with special characters', () => {
        const result = parseElementsInDialog('Olá! Como você está?', 'pt');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Olá' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Como' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'você' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'está' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });
    });

    describe('Polish (pl)', () => {
      it('should parse Polish sentence with special characters', () => {
        const result = parseElementsInDialog('Cześć! Jak się masz?', 'pl');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Cześć' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Jak' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'się' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'masz' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });
    });

    describe('Swedish (sv)', () => {
      it('should parse Swedish sentence with special characters', () => {
        const result = parseElementsInDialog('Hej! Hur mår du?', 'sv');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Hej' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Hur' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'mår' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'du' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });
    });

    describe('Edge cases', () => {
      it('should handle empty string', () => {
        const result = parseElementsInDialog('', 'en');
        expect(result).toEqual([]);
      });

      it('should handle only whitespace', () => {
        const result = parseElementsInDialog('   ', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WHITESPACE }
        ]);
      });

      it('should handle only punctuation', () => {
        const result = parseElementsInDialog('!?.,', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.PUNCTUATION, text: '.' },
          { type: ParsedElementType.PUNCTUATION, text: ',' }
        ]);
      });

      it('should handle line breaks', () => {
        const result = parseElementsInDialog('Hello<br>world', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Hello' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'world' }
        ]);
      });

      it('should handle complex sentence with multiple punctuation', () => {
        const result = parseElementsInDialog('Hello, world! How are you? I\'m fine.', 'en');
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Hello' },
          { type: ParsedElementType.PUNCTUATION, text: ',' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'world' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'How' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'are' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'you' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'I\'m' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'fine' },
          { type: ParsedElementType.PUNCTUATION, text: '.' }
        ]);
      });
    });
  });
});
