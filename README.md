# FHIR to CSV Conversion

### Purpose

The purpose of this project is to convert FHIR resources to CSV format. This is achieved using various extractors and converters present in the codebase.

### Overview of Extractors and Converters

The project includes several extractors and converters for different FHIR resources. Each extractor is responsible for extracting relevant data from a specific FHIR resource, and each converter is responsible for converting the extracted data to CSV format.

### Usage Instructions

To convert FHIR resources to CSV, follow these steps:

1. Create an instance of the `FHIRBundleConverter` class.
2. Use the `convertToDictionaries` method to extract data from a FHIR bundle.
3. Use the `convertToCSV` method to convert the extracted data to CSV format.

### Code Examples

Here are some code examples demonstrating how to use the extractors and converters to convert FHIR resources to CSV:

```ts
import { FHIRBundleConverter } from './src/converters/fhir_bundle_converter';
import { TBundle } from './src/types/resources/Bundle';

// Create an instance of the FHIRBundleConverter
const converter = new FHIRBundleConverter();

// Assume we have a FHIR bundle
const bundle: TBundle = {
  resourceType: 'Bundle',
  type: 'collection',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        id: 'example',
        // other patient data
      },
    },
    // other resources
  ],
};

// Extract data from the FHIR bundle
const extractedData = converter.convertToDictionaries(bundle);

// Convert the extracted data to CSV format
const csvData = converter.convertToCSV(extractedData);

// Output the CSV data
console.log(csvData);
```
