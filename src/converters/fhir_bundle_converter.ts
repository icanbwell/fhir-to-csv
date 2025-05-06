import { TBundle } from '../types/resources/Bundle';
import { TResource } from '../types/resources/Resource';
import { ExtractorRegistry } from './extractor_registry';
import xlsx from 'xlsx';
import JSZip from 'jszip';
import { Readable } from 'node:stream';

export class FHIRBundleConverter {
  async convertToDictionaries(
    bundle: TBundle
  ): Promise<Record<string, Record<string, any[]>[]>> {
    const extractedData: Record<string, Record<string, any[]>[]> = {};
    const errorLog: Record<string, string[]> = {};

    for (const entry of bundle.entry || []) {
      const resource: TResource | undefined = entry.resource;
      const resourceType: string | undefined = resource
        ? resource.resourceType
        : undefined;

      if (resource != undefined && resourceType != undefined) {
        try {
          // Attempt to get extractor
          const extractor = ExtractorRegistry.getExtractor(resourceType);
          const extractedResource: Record<string, any> =
            await extractor.extract(resource);

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
    }

    // Optionally, you could write error logs to a file or send them to a logging service
    if (Object.keys(errorLog).length > 0) {
      console.warn('Extraction Errors:', errorLog);
    }

    return extractedData;
  }

  // Convert extracted data to CSV format
  async convertToCSV(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Promise<Record<string, string[]>> {
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
        const row = Array.from(allKeys).map(key =>
          this.escapeCSV(resource[key])
        );
        csvRows.push(row.join(','));
      }

      csvRowsByResourceType[resourceType] = csvRows;
    }
    return csvRowsByResourceType;
  }

  async convertToCSVZipped(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Promise<NodeJS.ReadableStream> {
    const csvRowsByResourceType = await this.convertToCSV(extractedData);
    const zip = new JSZip();

    // Add each CSV to the zip file
    for (const [resourceType, csvRows] of Object.entries(csvRowsByResourceType)) {
      const csvContent = csvRows.join('\n');
      zip.file(`${resourceType}.csv`, csvContent);
    }

    return zip.generateNodeStream();
  }

  // Convert extracted data to Excel format using xlsx package
  async convertToExcel(
    extractedData: Record<string, Record<string, any[]>[]>
  ): Promise<NodeJS.ReadableStream> {
    const workbook = xlsx.utils.book_new();
    for (const [resourceType, resources] of Object.entries(extractedData)) {
      const worksheet = xlsx.utils.json_to_sheet(resources);
      xlsx.utils.book_append_sheet(workbook, worksheet, resourceType);
    }
    const buffer: Buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return Readable.from(buffer);
  }

  // CSV escape utility
  // noinspection JSUnusedLocalSymbols
  private async escapeCSV(value: any): Promise<string> {
    if (value == null) return '';
    const stringValue = String(value);
    const escapedValue = stringValue.replace(/"/g, '""');
    return escapedValue.includes(',') ? `"${escapedValue}"` : escapedValue;
  }
}
