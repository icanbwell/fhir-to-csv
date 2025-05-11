import { FHIRBundleConverter } from '../../src/fhir_bundle_converter';
import { TBundle } from '../../src/types/resources/Bundle';
import * as fs from 'node:fs';
import patient_bundle from './fixtures/patient_everything.json';

describe('Full Bundle Extractors', () => {
  describe('FHIRBundleConverter large bundle', () => {
    const converter = new FHIRBundleConverter();
    // read bundle from fixtures/patient_everything.json
    const bundle = patient_bundle as TBundle;

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

    it('should convert bundle to Zipped CSV file', () => {
      const extractedData: Buffer<ArrayBufferLike> =
        converter.convertToCSVZipped(
          converter.convertToDictionaries(bundle)
        );

      // write extractedData NodeJs.ReadableStream to file
      const writeStream = fs.createWriteStream(tempFolder + '/test_large.zip');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should convert bundle to Excel file', () => {
      const extractedData: Buffer<ArrayBufferLike> =
        converter.convertToExcel(
          converter.convertToDictionaries(bundle)
        );

      // write buffer to file
      const writeStream = fs.createWriteStream(tempFolder + '/test_large.xlsx');
      writeStream.write(extractedData);
      writeStream.end();
    });
    it('should convert bundle to Numbers file', () => {
      const extractedData: Buffer<ArrayBufferLike> =
        converter.convertToAppleNumbers(
          converter.convertToDictionaries(bundle)
        );

      // write buffer to file
      const writeStream = fs.createWriteStream(tempFolder + '/test_large.numbers');
      writeStream.write(extractedData);
      writeStream.end();
    });
  });
});
