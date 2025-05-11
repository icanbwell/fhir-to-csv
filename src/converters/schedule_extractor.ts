// `src/converters/schedule_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSchedule } from '../types/resources/Schedule';

export class ScheduleExtractor extends BaseResourceExtractor<TSchedule> {
  async extract(schedule: TSchedule): Promise<Record<string, ExtractorValueType>> {
    return {
      id: schedule.id,
      active: schedule.active,
      serviceCategory1: this.convertCodeableConcept(
        schedule.serviceCategory?.[0]
      ),
      serviceCategory2: this.convertCodeableConcept(
        schedule.serviceCategory?.[1]
      ),
      serviceCategory3: this.convertCodeableConcept(
        schedule.serviceCategory?.[2]
      ),
      serviceType1: this.convertCodeableConcept(
        schedule.serviceType?.[0]
      ),
      serviceType2: this.convertCodeableConcept(
        schedule.serviceType?.[1]
      ),
      serviceType3: this.convertCodeableConcept(
        schedule.serviceType?.[2]
      ),
      specialty1: this.convertCodeableConcept(
        schedule.specialty?.[0]
      ),
      specialty2: this.convertCodeableConcept(
        schedule.specialty?.[1]
      ),
      specialty3: this.convertCodeableConcept(
        schedule.specialty?.[2]
      ),
      specialty4: this.convertCodeableConcept(
        schedule.specialty?.[3]
      ),
      specialty5: this.convertCodeableConcept(
        schedule.specialty?.[4]
      ),
      actor1: this.convertReference(schedule.actor?.[0]),
      actor2: this.convertReference(schedule.actor?.[1]),
      actor3: this.convertReference(schedule.actor?.[2]),
      planningHorizonStart: this.convertDateTime(schedule.planningHorizon?.start),
      planningHorizonEnd: this.convertDateTime(schedule.planningHorizon?.end),
    };
  }
}