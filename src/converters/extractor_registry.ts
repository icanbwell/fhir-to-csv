import { BaseResourceExtractor, Extractor } from './base_extractor';

export class ExtractorRegistry {
  private static extractors: Map<string, Extractor<any>> = new Map();

  static register(resourceType: string, extractor: Extractor<any>): void {
    this.extractors.set(resourceType, extractor);
  }

  static getExtractor(resourceType: string): BaseResourceExtractor<any> {
    const ExtractorClass: Extractor<any> | undefined =
      this.extractors.get(resourceType);
    if (!ExtractorClass) {
      throw new Error(`No extractor found for resource type: ${resourceType}`);
    }
    return new ExtractorClass();
  }
}
