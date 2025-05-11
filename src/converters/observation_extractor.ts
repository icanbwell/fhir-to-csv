import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TObservation } from '../types/resources/Observation';

export class ObservationExtractor extends BaseResourceExtractor<TObservation> {
  async extract(
    observation: TObservation
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: observation.id,
      patientId: this.getReferenceId(observation.subject),
      status: observation.status,
      category1: this.convertCodeableConcept(
        observation.category?.[0]
      ),
      category2: this.convertCodeableConcept(
        observation.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        observation.category?.[2]
      ),
      code: this.convertCodeableConcept(observation.code),
      value: this.convertQuantity(
        observation.valueQuantity) || observation.valueString,
      interpretation1: this.convertCodeableConcept(
        observation.interpretation?.[0]
      ),
      interpretation2: this.convertCodeableConcept(
        observation.interpretation?.[1]
      ),
      interpretation3: this.convertCodeableConcept(
        observation.interpretation?.[2]
      ),
      effective: this.convertDateTime(observation.effectiveDateTime),
      issued: this.convertDateTime(observation.issued),
    };
  }
}
