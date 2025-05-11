import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TEncounter } from '../types/resources/Encounter';

export class EncounterExtractor extends BaseResourceExtractor<TEncounter> {
  async extract(
    encounter: TEncounter
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: encounter.id,
      patientId: this.getReferenceId(encounter.subject),

      ...this.getIdentifierFields(
        encounter.identifier?.[0],
        'identifier1'
      ),
      ...this.getIdentifierFields(
        encounter.identifier?.[1],
        'identifier2'
      ),
      ...this.getIdentifierFields(
        encounter.identifier?.[2],
        'identifier3'
      ),

      status: encounter.status,
      ...this.getCodingFields(
        encounter.class_,
        'classCode'
      ),
      ...this.getCodeableConceptFields(
        encounter.type?.[0],
        'type1'
      ),
      type2: this.convertCodeableConcept(encounter.type?.[1]),
      type3: this.convertCodeableConcept(encounter.type?.[2]),
      type4: this.convertCodeableConcept(encounter.type?.[3]),
      type5: this.convertCodeableConcept(encounter.type?.[4]),
      reasonCode1: this.convertCodeableConcept(encounter.reasonCode?.[0]),
      reasonCode2: this.convertCodeableConcept(encounter.reasonCode?.[1]),
      reasonCode3: this.convertCodeableConcept(encounter.reasonCode?.[2]),
      periodStart: this.convertDateTime(encounter.period?.start),
      periodEnd: this.convertDateTime(encounter.period?.end),
      participant1: this.convertReference(encounter.participant?.[0]?.individual),
      participant2: this.convertReference(encounter.participant?.[1]?.individual),
      participant3: this.convertReference(encounter.participant?.[2]?.individual),
      participant4: this.convertReference(encounter.participant?.[3]?.individual),
      participant5: this.convertReference(encounter.participant?.[4]?.individual),
    };
  }
}