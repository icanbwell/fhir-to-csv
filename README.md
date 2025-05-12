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
const extractedData = converter.convertBundleToDictionaries(bundle);

// Convert the extracted data to CSV format
const csvData = converter.convertToCSV(extractedData);

// Output the CSV data
console.log(csvData);
```

### Usage Instructions for Pure JavaScript Projects

To use this package in a pure JavaScript project, follow these steps:

1. Install the package using npm or yarn.
2. Import the `FHIRBundleConverter` class using `require`.
3. Use the `convertBundleToDictionaries` method to extract data from a FHIR bundle.
4. Use the `convertToCSV` method to convert the extracted data to CSV format.

### Code Examples for Pure JavaScript Projects

Here are some code examples demonstrating how to use the extractors and converters to convert FHIR resources to CSV in a pure JavaScript project:

```js
const { FHIRBundleConverter } = require('fhir-to-csv');

// Create an instance of the FHIRBundleConverter
const converter = new FHIRBundleConverter();

// Assume we have a FHIR bundle
const bundle = {
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
const extractedData = converter.convertBundleToDictionaries(bundle)
// Convert the extracted data to CSV format
const csvData = converter.convertToCSV(extractedData);
```

### Note on Dependency Installation

After adding this package to your project, ensure that you install the required dependencies by running `npm install` or `yarn install`.


## Making changes to existing converters
If you need to make changes to existing converters, follow these steps:
1. Identify the converter you want to modify in the `src/converters` directory.
2. Make the necessary changes to the converter code.
3. Test the changes by running the test suite to ensure that the modified converter works as expected.
4. Commit the changes and push them to the repository.
5. Create a pull request to merge the changes into the main branch.
6. Once the pull request is approved, merge the changes into the main branch.
7. Deploy the updated code to the production environment.

## Adding new converters
If you need to add new converters for additional FHIR resources, follow these steps:
1. Create a new file in the `src/converters` directory for the new converter.
2. Implement the converter logic in the new file, following the structure and conventions used in existing converters.
3. Add the new converter to the `FHIRBundleConverter` class so that it can be used to convert the new resource type.
4. Write units for testing the new converter by running the test suite to ensure that it works as expected.
5. Commit the changes and push them to the repository.