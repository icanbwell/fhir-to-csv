// `src/converters/binary_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TBinary } from '../types/resources/Binary';
import TextConverter from '../utils/textConverter';

export class BinaryExtractor extends BaseResourceExtractor<TBinary> {
  extract(binary: TBinary): Record<string, ExtractorValueType> {
    return {
      id: binary.id,
      contentType: binary.contentType,
      securityContext: this.convertReference(binary.securityContext),
      content: binary.data
        ? Buffer.from(binary.data, 'base64').toString('utf-8')
        : undefined, // Decode to plain text
    };
  }

  convertContent(contentType: string, data: string | undefined) {
    if (!data) {
      return undefined; // No data to convert
    }
    //write code to convert content to plain text and use content type to determine the encoding
    // content-type is either plain text, rtf or html
    if (contentType === 'text/plain') {
      return data;
    } else if (contentType === 'text/rtf') {
      // Convert RTF to plain text
      return TextConverter.convertRtfToText(data);
    } else if (contentType === 'text/html') {
      // Convert HTML to plain text
      return TextConverter.convertHtmlToText(data);
    }
    return undefined;
  }
}
