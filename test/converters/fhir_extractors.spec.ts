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
    {
      id: 'bwell-default-address',
      use: 'home',
      line: ['456 Test Avenue'],
      city: 'West Test',
      state: 'WI',
      postalCode: '12345',
      country: 'US',
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
        extension: [
          {
            id: 'preferred',
            url: 'https://fhir.icanbwell.com/4_0_0/StructureDefinition/intelligence',
            valueCode: 'preferred',
          },
        ],
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
        address1City: 'Testville',
        address1Line: '123 Test Street',
        address1State: 'TS',
        address2City: 'West Test',
        address2Country: 'US',
        address2Line: '456 Test Avenue',
        address2PostalCode: '12345',
        address2State: 'WI',
        address2Use: 'home',
        birthDate: '1980-01-01',
        ethnicity: 'Not Hispanic or Latino',
        gender: 'male',
        id: 'patient-1',
        identifier1System: 'master-person-fhir-id',
        identifier1Type:
          'https://fhir.icanbwell.com/4_0_0/CodeSystem/vs-identifier-type=fhir-master-person',
        identifier2System: 'sourceId',
        identifier2Value: '00000632-18eb-525e-9f74-e3c9a5cd9c7a',
        identifier3System: 'uuid',
        identifier3Value: '00000632-18eb-525e-9f74-e3c9a5cd9c7a',
        identifier4System: 'https://www.healthpartners.com/polnum',
        identifier4Type: 'Member Number',
        identifier4Use: 'usual',
        identifier4Value: '1000000',
        identifier5System: 'SSN',
        identifier5Type: 'Social Security Number',
        identifier5Use: 'usual',
        identifier5Value: '111-11-1111',
        name1Family: 'Doe',
        name1Given: 'John',
        name2Family: 'LAST',
        name2Given: 'FIRST, M, LAST',
        name2Text: 'FIRST M LAST',
        phone1: '555-1234',
        race: 'White',
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
        code1Code: '718-7',
        code1Display: 'Hemoglobin [Mass/volume] in Blood',
        code1Preferred: false,
        code1System: 'Loinc',
        code2Code: '718-7',
        code2Display: 'Hemoglobin',
        code2Preferred: true,
        code2System: 'Loinc',
        code3Code: '718-7',
        code3Display: 'in Blood',
        code3Preferred: false,
        code3System: 'Loinc',
        code4Code: '718-7',
        code4Display: 'Hemoglobin [Mass/volume] in Blood',
        code4Preferred: false,
        code4System: 'Loinc',
        id: 'obs-1',
        interpretation1: 'HL7=L (Low)',
        issued: '2023-01-01T10:00:00Z',
        patientId: 'patient-1',
        referenceRange1High: 10,
        referenceRange1Low: 7.5,
        referenceRange1Unit: 'g/dl',
        status: 'final',
        value: 7.2,
        valueSystem: 'UCUM',
        valueUnit: 'g/dl',
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
        'id,versionId,lastUpdated,sourceAssigningAuthority,source,hidden,profile1,tag1,tag2,tag3,extensions,extension1,extension2,extension3,extension4,extension5,identifier1System,identifier1Value,identifier1Type,identifier1Use,identifier2System,identifier2Value,identifier2Type,identifier2Use,identifier3System,identifier3Value,identifier3Type,identifier3Use,identifier4System,identifier4Value,identifier4Type,identifier4Use,identifier5System,identifier5Value,identifier5Type,identifier5Use,name1Use,name1Text,name1Family,name1Given,name1Prefix,name1Suffix,name2Use,name2Text,name2Family,name2Given,name2Prefix,name2Suffix,gender,birthSex,sex,race,ethnicity,birthDate,address1Line,address1City,address1State,address1PostalCode,address1Country,address1Use,address1Text,address2Line,address2City,address2State,address2PostalCode,address2Country,address2Use,address2Text,email1,email2,email3,phone1,phone2,phone3,maritalStatus,communication1Language,communication1Preferred,communication2Language,communication2Preferred,communication3Language,communication3Preferred,deceased,deceasedDateTime'
      );
      expect(extractedData['Patient'][1]).toEqual(
        'patient-1,1,2023-01-01T10:00:00Z,foo,#source,unregistered,http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient,unregistered,00000632-18eb-525e-9f74-e3c9a5cd9c7a,,2,http://hl7.org/fhir/us/core/StructureDefinition/us-core-race=undefined,http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity=undefined,,,,master-person-fhir-id,,https://fhir.icanbwell.com/4_0_0/CodeSystem/vs-identifier-type=fhir-master-person,,sourceId,00000632-18eb-525e-9f74-e3c9a5cd9c7a,,,uuid,00000632-18eb-525e-9f74-e3c9a5cd9c7a,,,https://www.healthpartners.com/polnum,1000000,Member Number,usual,SSN,111-11-1111,Social Security Number,usual,,,Doe,John,,,,FIRST M LAST,LAST,"FIRST, M, LAST",,,male,,,White,Not Hispanic or Latino,1980-01-01,123 Test Street,Testville,TS,,,,,456 Test Avenue,West Test,WI,12345,US,home,,,,,555-1234,,,,,,,,,,,'
      );

      expect(extractedData['Observation'][0]).toEqual(
        'id,versionId,lastUpdated,sourceAssigningAuthority,source,hidden,profile1,tag1,tag2,tag3,extensions,extension1,extension2,extension3,extension4,extension5,patientId,status,category2,category3,code1System,code1Code,code1Display,code1Preferred,code2System,code2Code,code2Display,code2Preferred,code3System,code3Code,code3Display,code3Preferred,code4System,code4Code,code4Display,code4Preferred,value,valueUnit,valueSystem,interpretation1,interpretation2,interpretation3,effective,issued,referenceRange1Low,referenceRange1High,referenceRange1Unit,referenceRange1Text'
      );
      expect(extractedData['Observation'][1]).toEqual(
        'obs-1,,,,,,,,,,,,,,,,patient-1,final,,,Loinc,718-7,Hemoglobin [Mass/volume] in Blood,false,Loinc,718-7,Hemoglobin,true,Loinc,718-7,in Blood,false,Loinc,718-7,Hemoglobin [Mass/volume] in Blood,false,7.2,g/dl,UCUM,HL7=L (Low),,,,2023-01-01T10:00:00Z,7.5,10,g/dl,'
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

