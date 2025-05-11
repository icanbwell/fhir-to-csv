import { PatientExtractor } from '../../src/converters/patient_extractor';
import { ObservationExtractor } from '../../src/converters/observation_extractor';
import { ExtractorRegistry } from '../../src/registry/extractor_registry';
import { FHIRBundleConverter } from '../../src/fhir_bundle_converter';
import { TBundle } from '../../src/types/resources/Bundle';
import { TPatient } from '../../src/types/resources/Patient';
import { ExtractorRegistrar } from '../../src/registry/register';
import { TResource } from '../../src/types/resources/Resource';
import * as fs from 'node:fs';

ExtractorRegistrar.registerAll();

const mockPatient = {
  resourceType: 'Patient',
  id: 'patient-1',
  meta: {
    versionId: '1',
    lastUpdated: '2023-01-01T10:00:00Z',
    source: '#source',
    profile: [
      'http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient',
    ],
    security: [
      {
        system: 'https://www.icanbwell.com/owner',
        code: 'foo',
      },
      {
        system: 'https://www.icanbwell.com/access',
        code: 'foo',
      },
      {
        system: 'https://www.icanbwell.com/sourceAssigningAuthority',
        code: 'foo',
      },
      {
        system: 'https://www.icanbwell.com/access',
        code: 'bar',
      },
      {
        system: 'https://www.icanbwell.com/access',
        code: 'bar2',
      },
      {
        system: 'https://www.icanbwell.com/vendor',
        code: 'booboo',
      },
      {
        system: 'https://www.icanbwell.com/connectionType',
        code: 'proa',
      },
    ],
    tag: [
      {
        system: 'https://fhir.icanbwell.com/4_0_0/CodeSystem/server-behavior',
        code: 'unregistered',
        display: 'registration-status',
      },
      {
        system: 'https://www.icanbwell.com/uuid',
        code: '00000632-18eb-525e-9f74-e3c9a5cd9c7a',
      },
    ],
  },
  identifier: [
    {
      type: {
        coding: [
          {
            system:
              'https://fhir.icanbwell.com/4_0_0/CodeSystem/vs-identifier-type',
            code: 'fhir-master-person',
          },
        ],
      },
      system: 'http://www.icanbwell.com/master-person-fhir-id',
    },
    {
      id: 'sourceId',
      system: 'https://www.icanbwell.com/sourceId',
      value: '00000632-18eb-525e-9f74-e3c9a5cd9c7a',
    },
    {
      id: 'uuid',
      system: 'https://www.icanbwell.com/uuid',
      value: '00000632-18eb-525e-9f74-e3c9a5cd9c7a',
    },
    {
      use: 'usual',
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'MB',
          },
        ],
        text: 'Member Number',
      },
      system: 'https://www.healthpartners.com/polnum',
      value: '1000000',
    },
    {
      use: 'usual',
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'SS',
          },
        ],
        text: 'Social Security Number',
      },
      system: 'http://hl7.org/fhir/sid/us-ssn',
      value: '111-11-1111',
    },
  ],
  name: [
    {
      given: ['John'],
      family: 'Doe',
    },
    {
      text: 'FIRST M LAST',
      family: 'LAST',
      given: ['FIRST', 'M', 'LAST'],
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
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race',
      extension: [
        {
          valueCoding: {
            display: 'White',
          },
        },
      ],
    },
    {
      url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity',
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
    display: 'John Doe',
  },
  code: {
    coding: [
      {
        id: '51f12959-eab9-5413-98f8-d0ad613bd460',
        system: 'http://loinc.org',
        code: '718-7',
        display: 'Hemoglobin [Mass/volume] in Blood',
      },
      {
        id: '51f12959-eab9-5413-98f8-d0ad613bd460',
        system: 'http://loinc.org',
        code: '718-7',
        display: 'Hemoglobin',
      },
      {
        id: '51f12959-eab9-5413-98f8-d0ad613bd460',
        system: 'http://loinc.org',
        code: '718-7',
        display: 'in Blood',
      },
      {
        id: '51f12959-eab9-5413-98f8-d0ad613bd460',
        system: 'http://loinc.org',
        code: '718-7',
        display: 'Hemoglobin [Mass/volume] in Blood',
      },
    ],
    text: 'Hello',
  },
  interpretation: [
    {
      coding: [
        {
          id: '724ce193-68e0-577c-af2c-bb30576762fe',
          system:
            'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          code: 'L',
          display: 'Low',
        },
      ],
    },
  ],
  valueQuantity: {
    value: 7.2,
    unit: 'g/dl',
    system: 'http://unitsofmeasure.org',
    code: 'g/dL',
  },
  issued: '2023-01-01T10:00:00Z',
  effectivePeriod: {
    start: '2013-04-05T10:30:10+01:00',
    end: '2013-04-05T10:30:10+01:00',
  },
  performer: [
    {
      extension: [
        {
          id: 'sourceId',
          url: 'https://www.icanbwell.com/sourceId',
          valueString: 'Practitioner/f005',
        },
        {
          id: 'uuid',
          url: 'https://www.icanbwell.com/uuid',
          valueString: 'Practitioner/11809d4e-2f15-566e-bb7e-64af2a9cfb74',
        },
        {
          id: 'sourceAssigningAuthority',
          url: 'https://www.icanbwell.com/sourceAssigningAuthority',
          valueString: 'bwell',
        },
      ],
      reference: 'Practitioner/f005',
      display: 'A. Langeveld',
    },
  ],
  referenceRange: [
    {
      low: {
        value: 7.5,
        unit: 'g/dl',
        system: 'http://unitsofmeasure.org',
        code: 'g/dL',
      },
      high: {
        value: 10,
        unit: 'g/dl',
        system: 'http://unitsofmeasure.org',
        code: 'g/dL',
      },
    },
  ],
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
        identifier1: 'master-person-fhir-id=undefined',
        identifier2: 'sourceId=00000632-18eb-525e-9f74-e3c9a5cd9c7a',
        identifier3: 'uuid=00000632-18eb-525e-9f74-e3c9a5cd9c7a',
        identifier4: 'https://www.healthpartners.com/polnum=1000000',
        identifier5: 'SSN=111-11-1111',
        name1: 'John Doe',
        name2: 'FIRST M LAST',
        birthDate: '1980-01-01',
        gender: 'male',
        race: 'White',
        ethnicity: 'Not Hispanic or Latino',
        address1: '123 Test Street, Testville, TS ',
        phone1: '555-1234',
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
        code1: '8302-2 (Body Height)',
        code1Code: '8302-2',
        code1Display: 'Body Height',
        value: '175 cm',
        effective: '2023-01-01T10:00:00Z',
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
        'id,versionId,lastUpdated,sourceAssigningAuthority,source,profile1,tag1,tag2,tag3,extensions,extension1,extension2,extension3,extension4,extension5,identifier1,identifier2,identifier3,identifier4,identifier5,name1,name2,name3,name4,name5,active,gender,birthSex,sex,race,ethnicity,birthDate,address1,address2,address3,address4,address5,email1,email2,email3,phone1,phone2,phone3,maritalStatus,communication1Language,communication1Preferred,communication2Language,communication2Preferred,communication3Language,communication3Preferred,deceased,deceasedDateTime'
      );
      expect(extractedData['Patient'][1]).toEqual(
        'patient-1,1,2023-01-01T10:00:00Z,foo,#source,http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient,unregistered,00000632-18eb-525e-9f74-e3c9a5cd9c7a,,2,http://hl7.org/fhir/us/core/StructureDefinition/us-core-race=undefined,http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity=undefined,,,,master-person-fhir-id=undefined,sourceId=00000632-18eb-525e-9f74-e3c9a5cd9c7a,uuid=00000632-18eb-525e-9f74-e3c9a5cd9c7a,https://www.healthpartners.com/polnum=1000000,SSN=111-11-1111,John Doe,FIRST M LAST,,,,,male,,,White,Not Hispanic or Latino,1980-01-01,"123 Test Street, Testville, TS ",,,,,,,,555-1234,,,,,,,,,,,'
      );

      expect(extractedData['Observation'][0]).toEqual(
        'id,versionId,lastUpdated,sourceAssigningAuthority,source,profile1,tag1,tag2,tag3,extensions,extension1,extension2,extension3,extension4,extension5,patientId,status,category1,category2,category3,code1,code1System,code1Code,code1Display,code2,code2System,code2Code,code2Display,code3,code3System,code3Code,code3Display,code4,code4System,code4Code,code4Display,code5,code5System,code5Code,code5Display,value,interpretation1,interpretation2,interpretation3,effective,issued'
      );
      expect(extractedData['Observation'][1]).toEqual(
        'obs-1,,,,patient-1,final,,8302-2,Body Height,175,,2023-01-01T10:00:00Z'
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
        'id,lastUpdated,sourceAssigningAuthority,source,sourceId,nameGiven,nameFamily,birthDate,gender,race,ethnicity,addressLine,addressCity,addressState,email,telecomPhone'
      );
      expect(extractedData['Patient'][1]).toEqual('123,,,,,John,Doe,,,,,,,,,');

      expect(extractedData['Observation'][0]).toEqual(
        'id,lastUpdated,sourceAssigningAuthority,source,patientId,status,category,code,codeDisplay,valueQuantity,valueString,effectiveDatetime'
      );
      expect(extractedData['Observation'][1]).toEqual('456,,,,123,final,,,,,,');
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
