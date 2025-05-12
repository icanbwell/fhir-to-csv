// `src/converters/slot_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSlot } from '../types/resources/Slot';

export class SlotExtractor extends BaseResourceExtractor<TSlot> {
  extract(slot: TSlot): Record<string, ExtractorValueType> {
    return {
      id: slot.id,
      status: slot.status,
      start: this.convertDateTime(slot.start),
      end: this.convertDateTime(slot.end),
      schedule: this.convertReference(slot.schedule),

      ...this.getCodeableConceptFields(
        slot.serviceCategory?.[0],
        'serviceCategory1'
      ),
      serviceCategory2: this.convertCodeableConcept(
        slot.serviceCategory?.[1]
      ),
      serviceCategory3: this.convertCodeableConcept(
        slot.serviceCategory?.[2]
      ),

      ...this.getCodeableConceptFields(
        slot.serviceType?.[0],
        'serviceType1'
      ),
      serviceType2: this.convertCodeableConcept(
        slot.serviceType?.[1]
      ),
      serviceType3: this.convertCodeableConcept(
        slot.serviceType?.[2]
      ),

      ...this.getCodeableConceptFields(
        slot.specialty?.[0],
        'specialty1'
      ),
      specialty2: this.convertCodeableConcept(
        slot.specialty?.[1]
      ),
      specialty3: this.convertCodeableConcept(
        slot.specialty?.[2]
      ),
      specialty4: this.convertCodeableConcept(
        slot.specialty?.[3]
      ),
      specialty5: this.convertCodeableConcept(
        slot.specialty?.[4]
      ),
    };
  }
}