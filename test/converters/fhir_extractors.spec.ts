import { PatientExtractor } from '../../src/converters/patient_extractor';
import { ObservationExtractor } from '../../src/converters/observation_extractor';
import { ExtractorRegistry } from '../../src/converters/extractor_registry';
import { FHIRBundleConverter } from '../../src/converters/fhir_bundle_converter';
import { TBundle } from '../../src/types/resources/Bundle';
import { TPatient } from '../../src/types/resources/Patient';
import { ExtractorRegistrar } from '../../src/converters/register';
import { TResource } from '../../src/types/resources/Resource';
import * as fs from 'node:fs';

ExtractorRegistrar.registerAll();

const mockPatient = {
  resourceType: 'Patient',
  id: 'patient-1',
  name: [
    {
      given: ['John'],
      family: 'Doe',
    },
  ],
  birthDate: '1980-01-01',
  gender: 'male',
  address: [
    {
      line: ['123 Test Street'],
      city: 'Testville',
      state: 'TS',
    },
  ],
  telecom: [
    {
      system: 'phone',
      value: '555-1234',
    },
  ],
  extension: [
    {
      extension: [
        {
          valueCoding: {
            display: 'White',
          },
        },
      ],
    },
    {
      extension: [
        {
          valueCoding: {
            display: 'Not Hispanic or Latino',
          },
        },
      ],
    },
  ],
};

const mockObservation = {
  resourceType: 'Observation',
  id: 'obs-1',
  status: 'final',
  subject: {
    reference: 'Patient/patient-1',
  },
  code: {
    coding: [
      {
        code: '8302-2',
        display: 'Body Height',
      },
    ],
  },
  valueQuantity: {
    value: 175,
    unit: 'cm',
  },
  effectiveDateTime: '2023-01-01T10:00:00Z',
};

const mockBundle: TBundle = {
  entry: [{ resource: mockPatient }, { resource: mockObservation }],
  type: 'collection',
};

describe('FHIR Resource Extractors', () => {
  describe('PatientExtractor', () => {
    const extractor = new PatientExtractor();

    it('should extract patient data correctly', async () => {
      const extractedPatient = await extractor.extract(mockPatient);

      expect(extractedPatient).toEqual({
        id: 'patient-1',
        nameGiven: 'John',
        nameFamily: 'Doe',
        birthDate: '1980-01-01',
        gender: 'male',
        race: 'White',
        ethnicity: 'Not Hispanic or Latino',
        addressLine: '123 Test Street',
        addressCity: 'Testville',
        addressState: 'TS',
        telecomPhone: '555-1234',
      });
    });

    it('should handle missing optional fields', async () => {
      const incompletePatient: TPatient = { ...mockPatient };
      delete incompletePatient.name;
      delete incompletePatient.address;
      delete incompletePatient.telecom;

      const extractedPatient = await extractor.extract(incompletePatient);

      expect(extractedPatient.nameGiven).toBeUndefined();
      expect(extractedPatient.addressLine).toBeUndefined();
      expect(extractedPatient.telecomPhone).toBeUndefined();
    });
  });

  describe('ObservationExtractor', () => {
    const extractor = new ObservationExtractor();

    it('should extract observation data correctly', async () => {
      const extractedObservation = await extractor.extract(mockObservation);

      expect(extractedObservation).toEqual({
        id: 'obs-1',
        patientId: 'patient-1',
        status: 'final',
        category: undefined,
        code: '8302-2',
        codeDisplay: 'Body Height',
        valueQuantity: 175,
        valueString: undefined,
        effectiveDatetime: '2023-01-01T10:00:00Z',
      });
    });
  });

  describe('ExtractorRegistry', () => {
    it('should register and retrieve extractors', async () => {
      // Ensure extractors are registered
      const patientExtractor = ExtractorRegistry.getExtractor('Patient');
      const observationExtractor =
        ExtractorRegistry.getExtractor('Observation');

      expect(patientExtractor).toBeTruthy();
      expect(observationExtractor).toBeTruthy();
    });

    it('should throw error for unknown resource type', async () => {
      expect(() => {
        ExtractorRegistry.getExtractor('UnknownResource');
      }).toThrow('No extractor found for resource type: UnknownResource');
    });
  });

  describe('FHIRBundleConverter', () => {
    const converter = new FHIRBundleConverter();

    it('should convert bundle to CSV-compatible data', async () => {
      const extractedData = await converter.convertToDictionaries(mockBundle);

      expect(Object.keys(extractedData)).toContain('Patient');
      expect(Object.keys(extractedData)).toContain('Observation');

      expect(extractedData['Patient'].length).toBe(1);
      expect(extractedData['Observation'].length).toBe(1);
    });

    it('should convert bundle to CSV data', async () => {
      const extractedDictionaries =
        await converter.convertToDictionaries(mockBundle);
      const extractedData: Record<string, string[]> =
        await converter.convertToCSV(extractedDictionaries);

      // test that the csv data contains the correct headers
      expect(extractedData['Patient'][0]).toEqual(
        'id,nameGiven,nameFamily,birthDate,gender,race,ethnicity,addressLine,addressCity,addressState,telecomPhone'
      );
      expect(extractedData['Patient'][1]).toEqual(
        'patient-1,John,Doe,1980-01-01,male,White,Not Hispanic or Latino,123 Test Street,Testville,TS,555-1234'
      );

      expect(extractedData['Observation'][0]).toEqual(
        'id,patientId,status,category,code,codeDisplay,valueQuantity,valueString,effectiveDatetime'
      );
      expect(extractedData['Observation'][1]).toEqual(
        'obs-1,patient-1,final,,8302-2,Body Height,175,,2023-01-01T10:00:00Z'
      );
    });

    it('should convert bundle to Zipped CSV data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToCSVZipped(
          await converter.convertToDictionaries(mockBundle)
        );

      // get folder containing this test
      const tempFolder = __dirname + '/temp';
      // if subfolder temp from current folder exists then delete it
      if (fs.existsSync(tempFolder)) {
        fs.rmSync(tempFolder, { recursive: true, force: true });
      }
      // if subfolder temp from current folder does not exist then create it
      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
      }

      // write extractedData NodeJs.ReadableStream to file
      const writeStream = fs.createWriteStream(tempFolder + '/test.zip');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should convert bundle to Excel data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToExcel(
          await converter.convertToDictionaries(mockBundle)
        );
      // get folder containing this test
      const tempFolder = __dirname + '/temp';
      // if subfolder temp from current folder exists then delete it
      if (fs.existsSync(tempFolder)) {
        fs.rmSync(tempFolder, { recursive: true, force: true });
      }
      // if subfolder temp from current folder does not exist then create it
      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
      }

      // write buffer to file
      const writeStream = fs.createWriteStream(tempFolder + '/test.xlsx');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should handle empty bundle', async () => {
      const emptyBundle: TBundle = { entry: [], type: 'collection' };
      const extractedData = await converter.convertToDictionaries(emptyBundle);

      expect(Object.keys(extractedData).length).toBe(0);
    });
  });
});

// Additional test cases for other extractors
describe('Additional Resource Extractors', () => {
  const extractorTestCases = [
    {
      resourceType: 'Condition',
      mockResource: {
        resourceType: 'Condition',
        id: 'condition-1',
        subject: { reference: 'Patient/patient-1' },
        clinicalStatus: {
          coding: [{ code: 'active' }],
        },
        code: {
          coding: [
            {
              code: '123456',
              display: 'Example Condition',
            },
          ],
        },
      },
      expectedFields: ['id', 'patientId', 'clinicalStatus', 'code'],
    },
    {
      resourceType: 'Immunization',
      mockResource: {
        resourceType: 'Immunization',
        id: 'imm-1',
        patient: { reference: 'Patient/patient-1' },
        vaccineCode: {
          coding: [
            {
              code: 'VAC-1',
              display: 'Example Vaccine',
            },
          ],
        },
        status: 'completed',
      },
      expectedFields: ['id', 'patientId', 'status', 'vaccineCode'],
    },
    // Add more test cases for other resource types
  ];

  extractorTestCases.forEach(testCase => {
    describe(`${testCase.resourceType} Extractor`, () => {
      it(`should extract ${testCase.resourceType} data correctly`, async () => {
        const extractor = ExtractorRegistry.getExtractor(testCase.resourceType);
        const extractedResource = await extractor.extract(
          testCase.mockResource
        );

        // Check that all expected fields are present
        testCase.expectedFields.forEach(field => {
          expect(extractedResource).toHaveProperty(field);
        });
      });
    });
  });
});

// Error Handling Test
describe('Extractor Error Handling', () => {
  it('should handle malformed resources gracefully', async () => {
    const malformedResources: (TResource | null | undefined)[] = [
      { resourceType: 'Patient' }, // Completely empty
      null,
      undefined,
    ];

    for (const resource of malformedResources) {
      if (resource != undefined) {
        const extractors = Object.keys(ExtractorRegistry['extractors']);

        for (const resourceType of extractors) {
          const extractor = ExtractorRegistry.getExtractor(resourceType);

          expect(async () => {
            await extractor.extract(resource);
          }).not.toThrow(); // Should not throw, but return an object with undefined/null values
        }
      }
    }
  });
});

// Performance Test
describe('Extractor Performance', () => {
  it('should handle large number of resources efficiently', async () => {
    // Generate a large bundle with multiple resource types
    const largeBundle: TBundle = {
      entry: Array.from({ length: 1000 }, (_, i) => ({
        resource: {
          ...mockPatient,
          id: `patient-${i}`,
        },
      })),
      type: 'collection',
    };

    const startTime = performance.now();
    const extractedData = await new FHIRBundleConverter().convertToDictionaries(
      largeBundle
    );
    const endTime = performance.now();

    expect(extractedData['Patient'].length).toBe(1000);

    // Ensure conversion takes less than 1 second for 1000 resources
    expect(endTime - startTime).toBeLessThan(1000);
  });
});

describe('Full Bundle Extractors', () => {
  describe('FHIRBundleConverter', () => {
    const converter = new FHIRBundleConverter();
    const bundle = {
      resourceType: 'Bundle',
      type: 'searchset',
      timestamp: '2025-05-06T08:53:38.3838Z',
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: '123',
            name: [
              {
                use: 'official',
                family: 'Doe',
                given: ['John'],
              },
            ],
          },
        },
        {
          resource: {
            resourceType: 'Observation',
            id: '456',
            status: 'final',
            code: {
              text: 'Heart Rate',
            },
            subject: {
              reference: 'Patient/123',
            },
          },
        },
        {
          resource: {
            resourceType: 'Observation',
            id: '789',
            status: 'final',
            code: {
              text: 'Heart Rate',
            },
            subject: {
              reference: 'Patient/123',
            },
          },
        },
      ],
    };

    it('should convert bundle to CSV-compatible data', async () => {
      const extractedData = await converter.convertToDictionaries(bundle);

      expect(Object.keys(extractedData)).toContain('Patient');
      expect(Object.keys(extractedData)).toContain('Observation');

      expect(extractedData['Patient'].length).toBe(1);
      expect(extractedData['Observation'].length).toBe(2);
    });

    it('should convert bundle to CSV data', async () => {
      const extractedDictionaries =
        await converter.convertToDictionaries(bundle);
      const extractedData: Record<string, string[]> =
        await converter.convertToCSV(extractedDictionaries);

      // test that the csv data contains the correct headers
      expect(extractedData['Patient'][0]).toEqual(
        'id,nameGiven,nameFamily,birthDate,gender,race,ethnicity,addressLine,addressCity,addressState,telecomPhone'
      );
      expect(extractedData['Patient'][1]).toEqual(
        '123,John,Doe,,,,,,,,'
      );

      expect(extractedData['Observation'][0]).toEqual(
        'id,patientId,status,category,code,codeDisplay,valueQuantity,valueString,effectiveDatetime'
      );
      expect(extractedData['Observation'][1]).toEqual(
        '456,123,final,,,,,,'
      );
    });

    it('should convert bundle to Zipped CSV data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToCSVZipped(
          await converter.convertToDictionaries(bundle)
        );

      // get folder containing this test
      const tempFolder = __dirname + '/temp';
      // if subfolder temp from current folder exists then delete it
      if (fs.existsSync(tempFolder)) {
        fs.rmSync(tempFolder, { recursive: true, force: true });
      }
      // if subfolder temp from current folder does not exist then create it
      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
      }

      // write extractedData NodeJs.ReadableStream to file
      const writeStream = fs.createWriteStream(tempFolder + '/test.zip');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should convert bundle to Excel data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToExcel(
          await converter.convertToDictionaries(bundle)
        );
      // get folder containing this test
      const tempFolder = __dirname + '/temp';
      // if subfolder temp from current folder exists then delete it
      if (fs.existsSync(tempFolder)) {
        fs.rmSync(tempFolder, { recursive: true, force: true });
      }
      // if subfolder temp from current folder does not exist then create it
      if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
      }

      // write buffer to file
      const writeStream = fs.createWriteStream(tempFolder + '/test.xlsx');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should handle empty bundle', async () => {
      const emptyBundle: TBundle = { entry: [], type: 'collection' };
      const extractedData = await converter.convertToDictionaries(emptyBundle);

      expect(Object.keys(extractedData).length).toBe(0);
    });
  });
});
