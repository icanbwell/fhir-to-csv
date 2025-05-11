import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSpecimen } from '../types/resources/Specimen';

export class SpecimenExtractor extends BaseResourceExtractor<TSpecimen> {
  async extract(specimen: TSpecimen): Promise<Record<string, ExtractorValueType>> {
    return {
      id: specimen.id,
      type1: this.convertCoding(specimen.type?.coding?.[0]),
      type2: this.convertCoding(specimen.type?.coding?.[1]),
      type3: this.convertCoding(specimen.type?.coding?.[2]),
      subject: this.convertReference(specimen.subject),
      collectedDateTime: this.convertDateTime(specimen.receivedTime),
    };
  }
}