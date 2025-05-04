export abstract class BaseResourceExtractor<T> {
  abstract extract(resource: T): Record<string, any>;
}

// Utility type for extractors
export type Extractor<T> = new () => BaseResourceExtractor<T>;
