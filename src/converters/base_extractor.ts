export abstract class BaseResourceExtractor<T> {
  abstract extract(resource: T): Record<string, never>;
}

// Utility type for extractors
export type Extractor<T> = new () => BaseResourceExtractor<T>;
