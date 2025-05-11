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

      code1: this.convertCoding(observation.code?.coding?.[0]),
      code1System: this.getFriendlyNameForSystem(observation.code?.coding?.[0]?.system),
      code1Code: observation.code?.coding?.[0]?.code,
      code1Display: observation.code?.coding?.[0]?.display,
      code2: this.convertCoding(observation.code?.coding?.[1]),
      code2System: this.getFriendlyNameForSystem(observation.code?.coding?.[1]?.system),
      code2Code: observation.code?.coding?.[1]?.code,
      code2Display: observation.code?.coding?.[1]?.display,
      code3: this.convertCoding(observation.code?.coding?.[2]),
      code3System: this.getFriendlyNameForSystem(observation.code?.coding?.[2]?.system),
      code3Code: observation.code?.coding?.[2]?.code,
      code3Display: observation.code?.coding?.[2]?.display,
      code4: this.convertCoding(observation.code?.coding?.[3]),
      code4System: this.getFriendlyNameForSystem(observation.code?.coding?.[3]?.system),
      code4Code: observation.code?.coding?.[3]?.code,
      code4Display: observation.code?.coding?.[3]?.display,
      code5: this.convertCoding(observation.code?.coding?.[4]),
      code5System: this.getFriendlyNameForSystem(observation.code?.coding?.[4]?.system),
      code5Code: observation.code?.coding?.[4]?.code,
      code5Display: observation.code?.coding?.[4]?.display,

      value: observation.valueQuantity?.value || observation.valueString,
      valueUnit: observation.valueQuantity?.unit,
      valueSystem: this.getFriendlyNameForSystem(observation.valueQuantity?.system),

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
