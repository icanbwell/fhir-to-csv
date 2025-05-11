import { TBundle } from './types/resources/Bundle';
import { TResource } from './types/resources/Resource';
import { ExtractorRegistry } from './registry/extractor_registry';
import xlsx from 'xlsx';
import { strToU8, zipSync } from 'fflate';
import { ExtractorRegistrar } from './registry/register';
// @ts-expect-error The @types for xlsx do not include the zahl payload
import XLSX_ZAHL_PAYLOAD from 'xlsx/dist/xlsx.zahl';

export class FHIRBundleConverter {
  convertToDictionaries(
    bundle: TBundle
  ): Record<string, Record<string, any[]>[]> {
    ExtractorRegistrar.registerAll();

    const extractedData: Record<string, Record<string, any[]>[]> = {};
    const errorLog: Record<string, string[]> = {};

    for (const entry of bundle.entry || []) {
      const resource: TResource | undefined = entry.resource;
      const resourceType: string | undefined = resource
        ? resource.resourceType
        : undefined;

      if (
        resource != undefined &&
        resourceType != undefined &&
        ExtractorRegistry.has(resourceType)
      ) {
        try {
          // get the domain resource extractor to get common fields
          const domainExtractor =
            ExtractorRegistry.getExtractor('DomainResource');
          const domainResource: Record<string, any> =
            domainExtractor.extract(resource);
          // Attempt to get extractor
          const extractor = ExtractorRegistry.getExtractor(resourceType);
          const extractedResource: Record<string, any> =
            extractor.extract(resource);

          // Merge common fields with specific resource fields
          const fullExtractedResource: Record<string, any> = {
            ...domainResource,
            ...extractedResource,
          };

          // Initialize array for resource type if not exists
          if (!extractedData[resourceType]) {
            extractedData[resourceType] = [];
          }

          extractedData[resourceType].push(fullExtractedResource);
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
    }

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
    for (const [resourceType, resources] of Object.entries(extractedData)) {
      const csvRows: string[] = [];
      const allKeys: Set<string> = new Set();

      // Collect keys from the first resource
      if (resources.length > 0) {
        Object.keys(resources[0]).forEach(key => allKeys.add(key));
      }

      // Create CSV header
      csvRows.push(Array.from(allKeys).join(','));

      // Create CSV rows for each resource
      for (const resource of resources) {
        const row: string[] = Array.from(allKeys).map(key =>
          this.escapeCSV(resource[key])
        );
        csvRows.push(row.join(','));
      }

      csvRowsByResourceType[resourceType] = csvRows;
    }
    return csvRowsByResourceType;
  }

  convertToCSVZipped(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Buffer<ArrayBufferLike> {
    // Synchronous CSV conversion
    const csvRowsByResourceType = this.convertToCSV(extractedData);

    // Prepare files for zipping
    const zipFiles: Record<string, Uint8Array> = {};

    // Convert CSV content to Uint8Array for each resource type
    for (const [resourceType, csvRows] of Object.entries(
      csvRowsByResourceType
    )) {
      const csvContent = csvRows.join('\n');
      zipFiles[`${resourceType}.csv`] = strToU8(csvContent);
    }

    const zippedData: Uint8Array = zipSync(zipFiles);

    return Buffer.from(zippedData);
  }

  // Convert extracted data to Excel format using xlsx package
  convertToExcel(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Buffer<ArrayBufferLike> {
    const workbook = xlsx.utils.book_new();
    for (const [resourceType, resources] of Object.entries(extractedData)) {
      const worksheet = xlsx.utils.json_to_sheet(resources);
      xlsx.utils.book_append_sheet(workbook, worksheet, resourceType);
    }
    // https://docs.sheetjs.com/docs/api/write-options/#writing-options
    // https://docs.sheetjs.com/docs/api/write-options/#supported-output-formats
    return xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
      compression: true,
    });
  }

  // Convert extracted data to Excel format using xlsx package
  convertToAppleNumbers(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Buffer<ArrayBufferLike> {
    const workbook = xlsx.utils.book_new();
    for (const [resourceType, resources] of Object.entries(extractedData)) {
      const worksheet = xlsx.utils.json_to_sheet(resources);
      xlsx.utils.book_append_sheet(workbook, worksheet, resourceType);
    }
    // https://docs.sheetjs.com/docs/api/write-options/#writing-options
    return xlsx.write(workbook, {
      type: 'buffer',
      bookType: 'numbers',
      compression: true,
      numbers: XLSX_ZAHL_PAYLOAD,
    });
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
