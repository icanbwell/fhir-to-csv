import { FHIRBundleConverter } from '../../src/fhir_bundle_converter';
import { TBundle } from '../../src/types/resources/Bundle';
import * as fs from 'node:fs';

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

// Performance Test
describe('Extractor Performance', () => {
  it('should handle large number of resources efficiently', () => {
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
    const extractedData = new FHIRBundleConverter().convertBundleToDictionaries(
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

    it('should convert bundle to CSV-compatible data', () => {
      const extractedData = converter.convertBundleToDictionaries(bundle);

      expect(Object.keys(extractedData)).toContain('Patient');
      expect(Object.keys(extractedData)).toContain('Observation');

      expect(extractedData['Patient'].length).toBe(1);
      expect(extractedData['Observation'].length).toBe(2);
    });

    it('should convert bundle to CSV data', () => {
      const extractedDictionaries =
        converter.convertBundleToDictionaries(bundle);
      const extractedData: Record<string, string[]> =
        converter.convertToCSV(extractedDictionaries);

      // test that the csv data contains the correct headers
      expect(extractedData['Patient'][0].split(',')).toEqual([
        'id',
        'versionId',
        'lastUpdated',
        'sourceAssigningAuthority',
        'connectionType',
        'vendor',
        'owner',
        'source',
        'hidden',
        'profile1',
        'tag1',
        'tag2',
        'tag3',
        'extensions',
        'extension1Id',
        'extension1Url',
        'extension1Value',
        'extension2Id',
        'extension2Url',
        'extension2Value',
        'extension3Id',
        'extension3Url',
        'extension3Value',
        'extension4Id',
        'extension4Url',
        'extension4Value',
        'extension5Id',
        'extension5Url',
        'extension5Value',
        'identifier1System',
        'identifier1Value',
        'identifier1Type',
        'identifier1Use',
        'identifier2System',
        'identifier2Value',
        'identifier2Type',
        'identifier2Use',
        'identifier3System',
        'identifier3Value',
        'identifier3Type',
        'identifier3Use',
        'identifier4System',
        'identifier4Value',
        'identifier4Type',
        'identifier4Use',
        'identifier5System',
        'identifier5Value',
        'identifier5Type',
        'identifier5Use',
        'name1Use',
        'name1Text',
        'name1Family',
        'name1Given',
        'name1Prefix',
        'name1Suffix',
        'name2Use',
        'name2Text',
        'name2Family',
        'name2Given',
        'name2Prefix',
        'name2Suffix',
        'name3Use',
        'name3Text',
        'name3Family',
        'name3Given',
        'name3Prefix',
        'name3Suffix',
        'name4Use',
        'name4Text',
        'name4Family',
        'name4Given',
        'name4Prefix',
        'name4Suffix',
        'name5Use',
        'name5Text',
        'name5Family',
        'name5Given',
        'name5Prefix',
        'name5Suffix',
        'gender',
        'birthSex',
        'sex',
        'race',
        'ethnicity',
        'birthDate',
        'address1Line',
        'address1City',
        'address1State',
        'address1PostalCode',
        'address1Country',
        'address1Use',
        'address1Text',
        'address2Line',
        'address2City',
        'address2State',
        'address2PostalCode',
        'address2Country',
        'address2Use',
        'address2Text',
        'address3Line',
        'address3City',
        'address3State',
        'address3PostalCode',
        'address3Country',
        'address3Use',
        'address3Text',
        'address4Line',
        'address4City',
        'address4State',
        'address4PostalCode',
        'address4Country',
        'address4Use',
        'address4Text',
        'address5Line',
        'address5City',
        'address5State',
        'address5PostalCode',
        'address5Country',
        'address5Use',
        'address5Text',
        'email1',
        'email2',
        'email3',
        'phone1',
        'phone2',
        'phone3',
        'maritalStatus',
        'communication1Language',
        'communication1Preferred',
        'communication2Language',
        'communication2Preferred',
        'communication3Language',
        'communication3Preferred',
        'deceased',
        'deceasedDateTime',
      ]);
      expect(extractedData['Patient'][1].split(',')).toEqual([
        '123',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'official',
        '',
        'Doe',
        'John',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]);

      expect(extractedData['Observation'][0].split(',')).toEqual([
        'id',
        'versionId',
        'lastUpdated',
        'sourceAssigningAuthority',
        'connectionType',
        'vendor',
        'owner',
        'source',
        'hidden',
        'profile1',
        'tag1',
        'tag2',
        'tag3',
        'extensions',
        'extension1Id',
        'extension1Url',
        'extension1Value',
        'extension2Id',
        'extension2Url',
        'extension2Value',
        'extension3Id',
        'extension3Url',
        'extension3Value',
        'extension4Id',
        'extension4Url',
        'extension4Value',
        'extension5Id',
        'extension5Url',
        'extension5Value',
        'patientId',
        'status',
        'identifier1System',
        'identifier1Value',
        'identifier1Type',
        'identifier1Use',
        'identifier2System',
        'identifier2Value',
        'identifier2Type',
        'identifier2Use',
        'identifier3System',
        'identifier3Value',
        'identifier3Type',
        'identifier3Use',
        'category1',
        'category1Text',
        'category1Coding1System',
        'category1Coding1Code',
        'category1Coding1Display',
        'category1Coding1Preferred',
        'category1Coding2System',
        'category1Coding2Code',
        'category1Coding2Display',
        'category1Coding2Preferred',
        'category1Coding3System',
        'category1Coding3Code',
        'category1Coding3Display',
        'category1Coding3Preferred',
        'category2',
        'category3',
        'code1System',
        'code1Code',
        'code1Display',
        'code1Preferred',
        'code2System',
        'code2Code',
        'code2Display',
        'code2Preferred',
        'code3System',
        'code3Code',
        'code3Display',
        'code3Preferred',
        'code4System',
        'code4Code',
        'code4Display',
        'code4Preferred',
        'code5System',
        'code5Code',
        'code5Display',
        'code5Preferred',
        'value',
        'valueUnit',
        'valueSystem',
        'interpretation1',
        'interpretation2',
        'interpretation3',
        'effective',
        'issued',
        'referenceRange1Low',
        'referenceRange1High',
        'referenceRange1Unit',
        'referenceRange1Text',
      ]);
      expect(extractedData['Observation'][1].split(',')).toEqual([
        '456',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '123',
        'final',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]);
    });

    it('should convert bundle to Zipped CSV data', () => {
      const extractedData: Buffer<ArrayBufferLike> =
        converter.convertToCSVZipped(
          converter.convertBundleToDictionaries(bundle)
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

    it('should convert bundle to Excel data', () => {
      const extractedData: Buffer<ArrayBufferLike> =
        converter.convertToExcel(
          converter.convertBundleToDictionaries(bundle)
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

    it('should handle empty bundle', () => {
      const emptyBundle: TBundle = { entry: [], type: 'collection' };
      const extractedData = converter.convertBundleToDictionaries(emptyBundle);

      expect(Object.keys(extractedData).length).toBe(0);
    });
  });
});
