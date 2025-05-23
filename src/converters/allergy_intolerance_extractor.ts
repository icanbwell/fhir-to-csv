import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TAllergyIntolerance } from '../types/resources/AllergyIntolerance';

export class AllergyIntoleranceExtractor extends BaseResourceExtractor<TAllergyIntolerance> {
  extract(
    allergyIntolerance: TAllergyIntolerance
  ): Record<string, ExtractorValueType> {
    return {
      id: allergyIntolerance.id,
      patientId: this.getReferenceId(allergyIntolerance.patient),
      ...this.getCodeableConceptFields(
        allergyIntolerance.clinicalStatus,
        'clinicalStatus'
      ),
      verificationStatus: this.convertCodeableConcept(
        allergyIntolerance.verificationStatus
      ),
      type: allergyIntolerance.type,
      category1: allergyIntolerance.category?.[0],
      category2: allergyIntolerance.category?.[1],
      category3: allergyIntolerance.category?.[2],
      criticality: allergyIntolerance.criticality,
      ...this.getCodeableConceptFields(
        allergyIntolerance.code,
        'code1'
      ),
      reaction1: this.convertCodeableConcept(
        allergyIntolerance.reaction?.[0]?.manifestation?.[0]
      ),
      reaction2: this.convertCodeableConcept(
        allergyIntolerance.reaction?.[0]?.manifestation?.[1]
      ),
      reaction3: this.convertCodeableConcept(
        allergyIntolerance.reaction?.[0]?.manifestation?.[2]
      ),
      onset: this.convertDateTime(allergyIntolerance.onsetDateTime),
      recordedDate: this.convertDateTime(allergyIntolerance.recordedDate),
    };
  }
}
