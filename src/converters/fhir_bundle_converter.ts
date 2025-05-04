import { TBundle } from '../types/resources/Bundle';
import { TResource } from '../types/resources/Resource';
import { ExtractorRegistry } from './extractor_registry';
import { TBundleEntry } from '../types/partials/BundleEntry';

export class FHIRBundleConverter {
  convertToCSV(bundle: TBundle): Record<string, any[]> {
    const extractedData: Record<string, any[]> = {};
    const errorLog: Record<string, string[]> = {};

    bundle.entry?.forEach((entry: TBundleEntry) => {
      const resource: TResource | undefined = entry.resource;
      const resourceType: string | undefined = resource
        ? resource.resourceType
        : undefined;

      if (resourceType != undefined) {
        try {
          // Attempt to get extractor
          const extractor = ExtractorRegistry.getExtractor(resourceType);
          const extractedResource = extractor.extract(resource);

          // Initialize array for resource type if not exists
          if (!extractedData[resourceType]) {
            extractedData[resourceType] = [];
          }

          extractedData[resourceType].push(extractedResource);
        } catch (error) {
          // Log errors for each resource type
          if (!errorLog[resourceType]) {
            errorLog[resourceType] = [];
          }
          errorLog[resourceType].push(
            error instanceof Error ? error.message : String(error)
          );

          console.error(`Error extracting ${resourceType}:`, error);
        }
      }
    });

    // Optionally, you could write error logs to a file or send them to a logging service
    if (Object.keys(errorLog).length > 0) {
      console.warn('Extraction Errors:', errorLog);
    }

    return extractedData;
  }

  // CSV escape utility
  private escapeCSV(value: any): string {
    if (value == null) return '';
    const stringValue = String(value);
    const escapedValue = stringValue.replace(/"/g, '""');
    return escapedValue.includes(',') ? `"${escapedValue}"` : escapedValue;
  }
}
