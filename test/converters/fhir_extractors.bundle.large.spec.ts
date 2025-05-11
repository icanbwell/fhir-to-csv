import { FHIRBundleConverter } from '../../src/fhir_bundle_converter';
import { TBundle } from '../../src/types/resources/Bundle';
import { ExtractorRegistrar } from '../../src/registry/register';
import * as fs from 'node:fs';
import patient_bundle from './fixtures/patient_everything.json';

ExtractorRegistrar.registerAll();

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

    it('should convert bundle to Zipped CSV data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToCSVZipped(
          await converter.convertToDictionaries(bundle)
        );

      // write extractedData NodeJs.ReadableStream to file
      const writeStream = fs.createWriteStream(tempFolder + '/test_large.zip');
      writeStream.write(extractedData);
      writeStream.end();
    });

    it('should convert bundle to Excel data', async () => {
      const extractedData: Buffer<ArrayBufferLike> =
        await converter.convertToExcel(
          await converter.convertToDictionaries(bundle)
        );

      // write buffer to file
      const writeStream = fs.createWriteStream(tempFolder + '/test_large.xlsx');
      writeStream.write(extractedData);
      writeStream.end();
    });
  });
});
