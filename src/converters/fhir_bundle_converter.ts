import { TBundle } from '../types/resources/Bundle';
import { TResource } from '../types/resources/Resource';
import { ExtractorRegistry } from './extractor_registry';
import { TBundleEntry } from '../types/partials/BundleEntry';

export class FHIRBundleConverter {
  convertToDictionaries(
    bundle: TBundle
  ): Record<string, Record<string, any[]>[]> {
    const extractedData: Record<string, Record<string, any[]>[]> = {};
    const errorLog: Record<string, string[]> = {};

    bundle.entry?.forEach((entry: TBundleEntry) => {
      const resource: TResource | undefined = entry.resource;
      const resourceType: string | undefined = resource
        ? resource.resourceType
        : undefined;

      if (resource != undefined && resourceType != undefined) {
        try {
          // Attempt to get extractor
          const extractor = ExtractorRegistry.getExtractor(resourceType);
          const extractedResource: Record<string, any> =
            extractor.extract(resource);

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

  // Convert extracted data to CSV format
  convertToCSV(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Record<string, string[]> {
    const csvRowsByResourceType: Record<string, string[]> = {};

    // iterate over each resource type
    Object.entries(extractedData).forEach(([resourceType, resources]) => {
      const csvRows: string[] = [];
      const allKeys: Set<string> = new Set();

      // Collect keys from the first resource
      if (resources.length > 0) {
        Object.keys(resources[0]).forEach(key => allKeys.add(key));
      }

      // Create CSV header
      csvRows.push(Array.from(allKeys).join(','));

      // Create CSV rows for each resource
      resources.forEach(resource => {
        const row = Array.from(allKeys).map(key =>
          this.escapeCSV(resource[key])
        );
        csvRows.push(row.join(','));
      });

      csvRowsByResourceType[resourceType] = csvRows;
    });
    return csvRowsByResourceType;
  }

  // CSV escape utility
  // noinspection JSUnusedLocalSymbols
  private escapeCSV(value: any): string {
    if (value == null) return '';
    const stringValue = String(value);
    const escapedValue = stringValue.replace(/"/g, '""');
    return escapedValue.includes(',') ? `"${escapedValue}"` : escapedValue;
  }
}
