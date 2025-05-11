import { BaseResourceExtractor, Extractor } from '../converters/base_extractor';
import { TResource } from '../types/resources/Resource';

export class ExtractorRegistry {
  private static extractors: Map<string, Extractor<TResource>> = new Map();

  static register(resourceType: string, extractor: Extractor<TResource>): void {
    this.extractors.set(resourceType, extractor);
  }

  static getExtractor(resourceType: string): BaseResourceExtractor<TResource> {
    const ExtractorClass: Extractor<TResource> | undefined =
      this.extractors.get(resourceType);
    if (!ExtractorClass) {
      throw new Error(`No extractor found for resource type: ${resourceType}`);
    }
    return new ExtractorClass();
  }

  static has(resourceType: string) {
    return this.extractors.has(resourceType);
  }

  static count() {
    return this.extractors.size;
  }
}
