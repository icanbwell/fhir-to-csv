// Bundle Converter
import { ExtractorRegistry } from './extractor_registry';
import { TBundle } from '../types/resources/Bundle';
import { TBundleEntry } from '../types/partials/BundleEntry';
import { TResource } from '../types/resources/Resource';

export class FHIRBundleConverter {
  convertToCSV(bundle: TBundle): Record<string, any[]> {
    const extractedData: Record<string, any[]> = {};

    bundle.entry?.forEach((entry: TBundleEntry) => {
      const resource: TResource | undefined = entry.resource;
      const resourceType: string | undefined = resource
        ? resource.resourceType
        : undefined;

      if (resourceType != undefined) {
        try {
          const extractor = ExtractorRegistry.getExtractor(resourceType);
          const extractedResource = extractor.extract(resource);

          if (!extractedData[resourceType]) {
            extractedData[resourceType] = [];
          }
          extractedData[resourceType].push(extractedResource);
        } catch (error) {
          console.error(`Error extracting ${resourceType}:`, error);
        }
      }
    });

    return extractedData;
  }
}
