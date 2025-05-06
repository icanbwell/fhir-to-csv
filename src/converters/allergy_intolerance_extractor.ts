import { BaseResourceExtractor } from './base_extractor';
import { TAllergyIntolerance } from '../types/resources/AllergyIntolerance';

export class AllergyIntoleranceExtractor extends BaseResourceExtractor<TAllergyIntolerance> {
  async extract(allergyIntolerance: TAllergyIntolerance): Promise<Record<string, any>> {
    return {
      id: allergyIntolerance.id,
      patientId: allergyIntolerance.patient?.reference?.split('/')?.pop(),
      clinicalStatus: allergyIntolerance.clinicalStatus?.coding?.[0]?.code,
      verificationStatus:
        allergyIntolerance.verificationStatus?.coding?.[0]?.code,
      type: allergyIntolerance.type,
      category: allergyIntolerance.category?.[0],
      criticality: allergyIntolerance.criticality,
      code: allergyIntolerance.code?.coding?.[0]?.code,
      codeDisplay: allergyIntolerance.code?.coding?.[0]?.display,
    };
  }
}
