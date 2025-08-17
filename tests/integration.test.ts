import { parseElementsInDialog } from '../src/index';
import { ParsedElementType } from '../src/type';

describe('Language Tokenizer Integration Tests', () => {
  describe('Complex Multi-language Scenarios', () => {
    it('should handle mixed punctuation and special characters', () => {
      const text = 'Hello! How are you? I\'m doing great, thanks. "What about you?" [Let\'s talk] (if you want).';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'Hello' },
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
        { type: ParsedElementType.WORD, text: 'doing' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'great' },
        { type: ParsedElementType.PUNCTUATION, text: ',' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'thanks' },
        { type: ParsedElementType.PUNCTUATION, text: '.' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.PUNCTUATION, text: '"' },
        { type: ParsedElementType.WORD, text: 'What' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'about' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'you' },
        { type: ParsedElementType.PUNCTUATION, text: '?' },
        { type: ParsedElementType.PUNCTUATION, text: '"' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.PUNCTUATION, text: '[' },
        { type: ParsedElementType.WORD, text: 'Let\'s' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'talk' },
        { type: ParsedElementType.PUNCTUATION, text: ']' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.PUNCTUATION, text: '(' },
        { type: ParsedElementType.WORD, text: 'if' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'you' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'want' },
        { type: ParsedElementType.PUNCTUATION, text: ')' },
        { type: ParsedElementType.PUNCTUATION, text: '.' }
      ]);
    });

    it('should handle numbers and special characters in text', () => {
      const text = 'The year is 2024! We have 3.14 pi, and 100% success rate.';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'The' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'year' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'is' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: '2024' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'We' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'have' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: '3' },
        { type: ParsedElementType.PUNCTUATION, text: '.' },
        { type: ParsedElementType.WORD, text: '14' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'pi' },
        { type: ParsedElementType.PUNCTUATION, text: ',' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'and' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.PUNCTUATION, text: '100%' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'success' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'rate' },
        { type: ParsedElementType.PUNCTUATION, text: '.' }
      ]);
    });
  });

  describe('Language-Specific Complex Cases', () => {
    describe('French Complex Cases', () => {
      it('should handle French with multiple accents and special characters', () => {
        const text = 'L\'été est arrivé! Comment allez-vous? C\'est magnifique, n\'est-ce pas?';
        const result = parseElementsInDialog(text, 'fr');
        
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'L\'été' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'est' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'arrivé' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Comment' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'allez' },
          { type: ParsedElementType.PUNCTUATION, text: '-' },
          { type: ParsedElementType.WORD, text: 'vous' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'C\'est' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'magnifique' },
          { type: ParsedElementType.PUNCTUATION, text: ',' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'n\'est' },
          { type: ParsedElementType.PUNCTUATION, text: '-' },
          { type: ParsedElementType.WORD, text: 'ce' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'pas' },
          { type: ParsedElementType.PUNCTUATION, text: '?' }
        ]);
      });
    });

    describe('Spanish Complex Cases', () => {
      it('should handle Spanish with inverted punctuation and special characters', () => {
        const text = '¡Hola! ¿Cómo estás? Me llamo María. ¡Qué bonito día!';
        const result = parseElementsInDialog(text, 'es');
        
        expect(result).toEqual([
          { type: ParsedElementType.PUNCTUATION, text: '¡' },
          { type: ParsedElementType.WORD, text: 'Hola' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.PUNCTUATION, text: '¿' },
          { type: ParsedElementType.WORD, text: 'Cómo' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'estás' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Me' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'llamo' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'María' },
          { type: ParsedElementType.PUNCTUATION, text: '.' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.PUNCTUATION, text: '¡' },
          { type: ParsedElementType.WORD, text: 'Qué' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'bonito' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'día' },
          { type: ParsedElementType.PUNCTUATION, text: '!' }
        ]);
      });
    });

    describe('Portuguese Complex Cases', () => {
      it('should handle Portuguese with special characters and contractions', () => {
        const text = 'Olá! Como você está? Estou muito bem, obrigado! É um prazer conhecê-lo.';
        const result = parseElementsInDialog(text, 'pt');
        
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Olá' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Como' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'você' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'está' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Estou' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'muito' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'bem' },
          { type: ParsedElementType.PUNCTUATION, text: ',' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'obrigado' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'É' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'um' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'prazer' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'conhecê' },
          { type: ParsedElementType.PUNCTUATION, text: '-' },
          { type: ParsedElementType.WORD, text: 'lo' },
          { type: ParsedElementType.PUNCTUATION, text: '.' }
        ]);
      });
    });

    describe('Polish Complex Cases', () => {
      it('should handle Polish with special characters and diacritics', () => {
        const text = 'Cześć! Jak się masz? Mam na imię Łukasz. To jest piękny dzień!';
        const result = parseElementsInDialog(text, 'pl');
        
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Cześć' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Jak' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'się' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'masz' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Mam' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'na' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'imię' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Łukasz' },
          { type: ParsedElementType.PUNCTUATION, text: '.' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'To' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'jest' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'piękny' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'dzień' },
          { type: ParsedElementType.PUNCTUATION, text: '!' }
        ]);
      });
    });

    describe('Swedish Complex Cases', () => {
      it('should handle Swedish with special characters and compound words', () => {
        const text = 'Hej! Hur mår du? Jag heter Åsa. Det är en vacker dag!';
        const result = parseElementsInDialog(text, 'sv');
        
        expect(result).toEqual([
          { type: ParsedElementType.WORD, text: 'Hej' },
          { type: ParsedElementType.PUNCTUATION, text: '!' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Hur' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'mår' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'du' },
          { type: ParsedElementType.PUNCTUATION, text: '?' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Jag' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'heter' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Åsa' },
          { type: ParsedElementType.PUNCTUATION, text: '.' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'Det' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'är' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'en' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'vacker' },
          { type: ParsedElementType.WHITESPACE },
          { type: ParsedElementType.WORD, text: 'dag' },
          { type: ParsedElementType.PUNCTUATION, text: '!' }
        ]);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle text with multiple consecutive spaces', () => {
      const text = 'Hello    world!';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'world' },
        { type: ParsedElementType.PUNCTUATION, text: '!' }
      ]);
    });

    it('should handle text with tabs and newlines', () => {
      const text = 'Hello\tworld\nnew line';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '\t' },
        { type: ParsedElementType.WORD, text: 'world' },
        { type: ParsedElementType.PUNCTUATION, text: '\n' },
        { type: ParsedElementType.WORD, text: 'new' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'line' }
      ]);
    });

    it('should handle text with only special characters', () => {
      const text = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.PUNCTUATION, text: '@#$%^&*' },
        { type: ParsedElementType.PUNCTUATION, text: '(' },
        { type: ParsedElementType.PUNCTUATION, text: ')' },
        { type: ParsedElementType.PUNCTUATION, text: '_+' },
        { type: ParsedElementType.PUNCTUATION, text: '-' },
        { type: ParsedElementType.PUNCTUATION, text: '=' },
        { type: ParsedElementType.PUNCTUATION, text: '[' },
        { type: ParsedElementType.PUNCTUATION, text: ']' },
        { type: ParsedElementType.PUNCTUATION, text: '{}|' },
        { type: ParsedElementType.PUNCTUATION, text: ';' },
        { type: ParsedElementType.PUNCTUATION, text: ':' },
        { type: ParsedElementType.PUNCTUATION, text: ',' },
        { type: ParsedElementType.PUNCTUATION, text: '.' },
        { type: ParsedElementType.PUNCTUATION, text: '<>' },
        { type: ParsedElementType.PUNCTUATION, text: '?' }
      ]);
    });

    it('should handle text with mixed case and special characters', () => {
      const text = 'HeLLo WoRlD! hOw ArE yOu?';
      const result = parseElementsInDialog(text, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'HeLLo' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'WoRlD' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'hOw' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'ArE' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'yOu' },
        { type: ParsedElementType.PUNCTUATION, text: '?' }
      ]);
    });
  });

  describe('Performance and Large Text Tests', () => {
    it('should handle long sentences efficiently', () => {
      const longText = 'This is a very long sentence that contains many words and should be processed efficiently by the tokenizer without any performance issues or memory problems.';
      const result = parseElementsInDialog(longText, 'en');
      
      expect(result.length).toBeGreaterThan(20);
      expect(result.some(element => element.type === ParsedElementType.WORD)).toBe(true);
      expect(result.some(element => element.type === ParsedElementType.PUNCTUATION)).toBe(true);
      expect(result.some(element => element.type === ParsedElementType.WHITESPACE)).toBe(true);
    });

    it('should handle repeated patterns', () => {
      const repeatedText = 'Hello! Hello! Hello! Hello! Hello!';
      const result = parseElementsInDialog(repeatedText, 'en');
      
      expect(result).toEqual([
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '!' },
        { type: ParsedElementType.WHITESPACE },
        { type: ParsedElementType.WORD, text: 'Hello' },
        { type: ParsedElementType.PUNCTUATION, text: '!' }
      ]);
    });
  });
});
