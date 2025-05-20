import * as fs from 'fs/promises';
import { convert, HtmlToTextOptions } from 'html-to-text';
import * as rtfParser from 'rtf-parser';
import TurndownService from 'turndown';

// Custom types for enhanced type safety
type FileExtension = 'rtf' | 'html' | 'htm';
type ConversionResult = string;

interface TextConverterOptions {
  encoding?: BufferEncoding;
  htmlToTextOptions?: HtmlToTextOptions;
}

class TextConverter {
  private static defaultOptions: TextConverterOptions = {
    encoding: 'utf-8',
    htmlToTextOptions: {
      wordwrap: 130,
      preserveNewlines: true,
      uppercaseHeadings: false,
    },
  };

  /**
   * Convert RTF file to plain text
   * @param rtfFilePath Path to RTF file
   * @param options Conversion options
   * @returns Promise resolving to plain text content
   */
  static async convertRtfToText(
    rtfFilePath: string,
    options: TextConverterOptions = {}
  ): Promise<ConversionResult> {
    const mergedOptions = { ...this.defaultOptions, ...options };

    try {
      // Read RTF file
      const rtfContent = await fs.readFile(rtfFilePath, {
        encoding: mergedOptions.encoding,
      });

      // Parse RTF to text
      return await new Promise<string>((resolve, reject) => {
        rtfParser.string(rtfContent, (err, doc) => {
          if (err) {
            reject(new Error(`RTF Parsing Error: ${err.message}`));
            return;
          }
          resolve(doc.toString());
        });
      });
    } catch (error) {
      this.handleConversionError('RTF', error);
      throw error;
    }
  }

  /**
   * Convert HTML file to plain text
   * @param htmlFilePath Path to HTML file
   * @param options Conversion options
   * @returns Promise resolving to plain text content
   */
  static async convertHtmlToText(
    htmlFilePath: string,
    options: TextConverterOptions = {}
  ): Promise<ConversionResult> {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
    };

    try {
      // Read HTML file
      const htmlContent = await fs.readFile(htmlFilePath, {
        encoding: mergedOptions.encoding,
      });

      // Convert HTML to plain text
      return convert(htmlContent, mergedOptions.htmlToTextOptions);
    } catch (error) {
      this.handleConversionError('HTML', error);
      throw error;
    }
  }

  /**
   * Convert HTML to Markdown
   * @param htmlFilePath Path to HTML file
   * @param options Conversion options
   * @returns Promise resolving to Markdown content
   */
  static async convertHtmlToMarkdown(
    htmlFilePath: string,
    options: TextConverterOptions = {}
  ): Promise<ConversionResult> {
    const mergedOptions = {
      ...this.defaultOptions,
      ...options,
    };

    try {
      // Read HTML file
      const htmlContent = await fs.readFile(htmlFilePath, {
        encoding: mergedOptions.encoding,
      });

      // Convert HTML to Markdown
      const turndownService = new TurndownService();
      return turndownService.turndown(htmlContent);
    } catch (error) {
      this.handleConversionError('HTML to Markdown', error);
      throw error;
    }
  }

  /**
   * Detect and convert file based on extension
   * @param filePath Path to file
   * @param options Conversion options
   * @returns Promise resolving to plain text content
   */
  static async convertFile(
    filePath: string,
    options: TextConverterOptions = {}
  ): Promise<ConversionResult> {
    const extension = filePath.split('.').pop()?.toLowerCase() as FileExtension;

    switch (extension) {
      case 'rtf':
        return this.convertRtfToText(filePath, options);
      case 'html':
      case 'htm':
        return this.convertHtmlToText(filePath, options);
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }

  /**
   * Handle conversion errors with standardized logging
   * @param conversionType Type of conversion
   * @param error Original error
   */
  private static handleConversionError(
    conversionType: string,
    error: unknown
  ): void {
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error(`${conversionType} Conversion Error:`, errorMessage);
  }
}

// Example usage and export
export default TextConverter;
