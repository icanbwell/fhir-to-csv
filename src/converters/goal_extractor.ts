import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TGoal } from '../types/resources/Goal';

export class GoalExtractor extends BaseResourceExtractor<TGoal> {
  async extract(goal: TGoal): Promise<Record<string, ExtractorValueType>> {
    return {
      id: goal.id,
      patientId: goal.subject?.reference?.split('/')?.pop(),
      status: goal.statusReason?.toString(),
      description: goal.description?.coding?.[0]?.display,
      category: goal.category?.[0]?.coding?.[0]?.code,
      startDate: goal.startDate?.toString(),
      targetDate: goal.target?.[0]?.dueDate?.toString(),
      targetQuantity: goal.target?.[0]?.measure?.coding?.[0]?.code,
      target: goal.target?.map(target => ({
        measure: target.measure?.coding?.[0]?.display,
        detailQuantity: target.detailQuantity?.value,
        dueDate: target.dueDate?.toString(),
      })),
      expressedBy: goal.expressedBy?.reference,
      priority: goal.priority?.coding?.[0]?.display,
    };
  }
}
