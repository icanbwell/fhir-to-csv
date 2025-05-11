// `src/converters/binary_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TBinary } from '../types/resources/Binary';

export class BinaryExtractor extends BaseResourceExtractor<TBinary> {
  async extract(binary: TBinary): Promise<Record<string, ExtractorValueType>> {
    return {
      id: binary.id,
      contentType: binary.contentType,
      securityContext: this.convertReference(binary.securityContext),
    };
  }
}