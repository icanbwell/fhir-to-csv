import TextConverter from '../../src/utils/textConverter';

describe('TextConverter', () => {
  describe('convertRtfToText', () => {
    it('should convert RTF content to plain text', () => {
      const rtfContent = '{\\rtf1\\ansi\\b Bold Text\\b0}';
      const result = TextConverter.convertRtfToText(rtfContent);
      expect(result).toBe('Bold Text');
    });
  });

  describe('convertHtmlToText', () => {
    it('should convert HTML content to plain text with default options', () => {
      const htmlContent = '<p>Hello, <strong>world</strong>!</p>';
      const result = TextConverter.convertHtmlToText(htmlContent);
      expect(result).toBe('Hello, world!');
    });

    it('should convert HTML content to plain text with custom options', () => {
      const htmlContent = '<p>Hello, <strong>world</strong>!</p>';
      const options = { htmlToTextOptions: { wordwrap: 80 } };
      const result = TextConverter.convertHtmlToText(htmlContent, options);
      expect(result).toBe('Hello, world!');
    });
  });

  describe('convertHtmlToMarkdown', () => {
    it('should convert HTML content to Markdown', () => {
      const htmlContent = '<h1>Title</h1><p>Paragraph</p>';
      const result = TextConverter.convertHtmlToMarkdown(htmlContent);
      expect(result).toBe('# Title\n\nParagraph');
    });
  });

  describe('convertText', () => {
    it('should convert RTF content based on extension', () => {
      const rtfContent = '{\\rtf1\\ansi\\b Bold Text\\b0}';
      const result = TextConverter.convertText(rtfContent, 'rtf');
      expect(result).toBe('Bold Text');
    });

    it('should convert HTML content based on extension', () => {
      const htmlContent = '<p>Hello, <strong>world</strong>!</p>';
      const result = TextConverter.convertText(htmlContent, 'html');
      expect(result).toBe('Hello, world!');
    });

    it('should throw an error for unsupported extensions', () => {
      expect(() => {
        TextConverter.convertText('Some content', 'txt' as any);
      }).toThrow('Unsupported text type: txt');
    });
  });
});