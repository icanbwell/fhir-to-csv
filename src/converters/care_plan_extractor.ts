import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCarePlan } from '../types/resources/CarePlan';

export class CarePlanExtractor extends BaseResourceExtractor<TCarePlan> {
  async extract(
    carePlan: TCarePlan
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: carePlan.id,
      patientId: this.convertReference(carePlan.subject),
      status: carePlan.status,
      intent: carePlan.intent,

      ...this.getCodeableConceptFields(
        carePlan.category?.[0],
        'category1'
      ),
      category2: this.convertCodeableConcept(
        carePlan.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        carePlan.category?.[2]
      ),
      title: carePlan.title,
      description: carePlan.description,
      periodStart: this.convertDateTime(carePlan.period?.start),
      periodEnd: this.convertDateTime(carePlan.period?.end),
      activityCount: carePlan.activity?.length,
      activity1: this.convertCodeableConcept(
        carePlan.activity?.[0]?.detail?.code
      ),
      activity2: this.convertCodeableConcept(
        carePlan.activity?.[1]?.detail?.code
      ),
      activity3: this.convertCodeableConcept(
        carePlan.activity?.[2]?.detail?.code
      ),
      author: this.convertReference(carePlan.author),
      careTeam1: this.convertReference(carePlan.careTeam?.[0]),
      careTeam2: this.convertReference(carePlan.careTeam?.[1]),
      careTeam3: this.convertReference(carePlan.careTeam?.[2]),
      careTeam4: this.convertReference(carePlan.careTeam?.[3]),
      careTeam5: this.convertReference(carePlan.careTeam?.[4]),
      address1: this.convertReference(carePlan.addresses?.[0]),
      address2: this.convertReference(carePlan.addresses?.[1]),
      address3: this.convertReference(carePlan.addresses?.[2]),
      goal1: this.convertReference(carePlan.goal?.[0]),
      goal2: this.convertReference(carePlan.goal?.[1]),
      goal3: this.convertReference(carePlan.goal?.[2]),
      goal4: this.convertReference(carePlan.goal?.[3]),
      goal5: this.convertReference(carePlan.goal?.[4]),
      goal6: this.convertReference(carePlan.goal?.[5]),
      goal7: this.convertReference(carePlan.goal?.[6]),
      goal8: this.convertReference(carePlan.goal?.[7]),
      goal9: this.convertReference(carePlan.goal?.[8]),
      goal10: this.convertReference(carePlan.goal?.[9]),
    };
  }
}
