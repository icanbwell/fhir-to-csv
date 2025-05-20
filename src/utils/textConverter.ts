import { convert, HtmlToTextOptions } from 'html-to-text';
import TurndownService from 'turndown';

// Custom types for enhanced type safety
type FileExtension = 'rtf' | 'html' | 'htm';
type ConversionResult = string;

interface TextConverterOptions {
  htmlToTextOptions?: HtmlToTextOptions;
}

class TextConverter {
  private static defaultOptions: TextConverterOptions = {
    htmlToTextOptions: {
      wordwrap: 130,
      preserveNewlines: true,
    },
  };

  /**
   * Convert RTF text to plain text
   * @param rtfContent RTF text content
   * @returns Plain text content
   */
  static convertRtfToText(rtfContent: string): ConversionResult {
    // Basic RTF cleaning regex
    // noinspection UnnecessaryLocalVariableJS
    const cleanedText = rtfContent
      .replace(/\{[\s\S]*?}/g, '') // Remove RTF control words and groups
      .replace(/\\[a-z]+(-?\d+)?\s?/gi, '') // Remove RTF control symbols
      .replace(/\\'[0-9a-f]{2}/gi, '') // Remove hex-encoded characters
      .replace(/[\r\n]+/g, ' ') // Remove newline and return characters
      .trim(); // Trim excess whitespace

    return cleanedText;
  }

  /**
   * Convert HTML text to plain text
   * @param htmlContent HTML text content
   * @param options Conversion options
   * @returns Plain text content
   */
  static convertHtmlToText(
    htmlContent: string,
    options: TextConverterOptions = {}
  ): ConversionResult {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
    };

    return convert(htmlContent, mergedOptions.htmlToTextOptions);
  }

  /**
   * Convert HTML text to Markdown
   * @param htmlContent HTML text content
   * @returns Markdown content
   */
  static convertHtmlToMarkdown(
    htmlContent: string,
  ): ConversionResult {
    const turndownService = new TurndownService();
    return turndownService.turndown(htmlContent);
  }

  /**
   * Detect and convert text based on extension
   * @param textContent Text content
   * @param extension File extension
   * @param options Conversion options
   * @returns Converted content
   */
  static convertText(
    textContent: string,
    extension: FileExtension,
    options: TextConverterOptions = {}
  ): ConversionResult {
    switch (extension) {
      case 'rtf':
        return this.convertRtfToText(textContent);
      case 'html':
      case 'htm':
        return this.convertHtmlToText(textContent, options);
      default:
        throw new Error(`Unsupported text type: ${extension}`);
    }
  }
}

// Example usage and export
export default TextConverter;
