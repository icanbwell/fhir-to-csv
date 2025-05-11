import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TAllergyIntolerance } from '../types/resources/AllergyIntolerance';

export class AllergyIntoleranceExtractor extends BaseResourceExtractor<TAllergyIntolerance> {
  async extract(
    allergyIntolerance: TAllergyIntolerance
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: allergyIntolerance.id,
      patientId: this.getReferenceId(allergyIntolerance.patient),
      clinicalStatus: this.convertCodeableConcept(
        allergyIntolerance.clinicalStatus
      ),
      verificationStatus: this.convertCodeableConcept(
        allergyIntolerance.verificationStatus
      ),
      type: allergyIntolerance.type,
      category: allergyIntolerance.category?.join('|'),
      criticality: allergyIntolerance.criticality,
      code: this.convertCodeableConcept(allergyIntolerance.code),
      reaction: this.convertCodeableConcepts(
        allergyIntolerance.reaction?.[0]?.manifestation
      ),
      onset: this.convertDateTime(allergyIntolerance.onsetDateTime),
      recordedDate: this.convertDateTime(allergyIntolerance.recordedDate),
    };
  }
}
