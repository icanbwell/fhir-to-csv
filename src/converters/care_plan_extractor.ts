import { BaseResourceExtractor } from './base_extractor';
import { TCarePlan } from '../types/resources/CarePlan';

export class CarePlanExtractor extends BaseResourceExtractor<TCarePlan> {
  async extract(carePlan: TCarePlan): Promise<Record<string, any>> {
    return {
      id: carePlan.id,
      patientId: carePlan.subject?.reference?.split('/')?.pop(),
      status: carePlan.status,
      intent: carePlan.intent,
      category: carePlan.category?.[0]?.coding?.[0]?.code,
      title: carePlan.title,
      description: carePlan.description,
      periodStart: carePlan.period?.start?.toString(),
      periodEnd: carePlan.period?.end?.toString(),
      activityCount: carePlan.activity?.length,
      firstActivityDetail:
        carePlan.activity?.[0]?.detail?.code?.coding?.[0]?.code,
    };
  }
}
