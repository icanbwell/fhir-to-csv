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

      ...this.getIdentifierFields(
        observation.identifier?.[0],
        'identifier1'
      ),
      ...this.getIdentifierFields(
        observation.identifier?.[1],
        'identifier2'
      ),
      ...this.getIdentifierFields(
        observation.identifier?.[2],
        'identifier3'
      ),

      ...this.getCodeableConceptFields(observation.category?.[0], 'category1'),
      category2: this.convertCodeableConcept(observation.category?.[1]),
      category3: this.convertCodeableConcept(observation.category?.[2]),

      ...this.getCodingFields(observation.code?.coding?.[0], 'code1'),
      ...this.getCodingFields(observation.code?.coding?.[1], 'code2'),
      ...this.getCodingFields(observation.code?.coding?.[2], 'code3'),
      ...this.getCodingFields(observation.code?.coding?.[3], 'code4'),
      ...this.getCodingFields(observation.code?.coding?.[4], 'code5'),

      value: observation.valueQuantity?.value || observation.valueString,
      valueUnit: observation.valueQuantity?.unit,
      valueSystem: this.getFriendlyNameForSystem(
        observation.valueQuantity?.system
      ),

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

      referenceRange1Low: observation.referenceRange?.[0]?.low?.value,
      referenceRange1High: observation.referenceRange?.[0]?.high?.value,
      referenceRange1Unit: observation.referenceRange?.[0]?.low?.unit,
      referenceRange1Text: observation.referenceRange?.[0]?.text,
    };
  }
}
