import { BaseResourceExtractor } from './base_extractor';
import { TGoal } from '../types/resources/Goal';

export class GoalExtractor extends BaseResourceExtractor<TGoal> {
  async extract(goal: TGoal): Promise<Record<string, any>> {
    return {
      id: goal.id,
      patientId: goal.subject?.reference?.split('/')?.pop(),
      status: goal.statusReason?.toString(),
      description: goal.description?.text,
      category: goal.category?.[0]?.coding?.[0]?.code,
      priority: goal.priority,
      startDate: goal.startDate?.toString(),
      targetDate: goal.target?.[0]?.dueDate?.toString(),
      targetQuantity: goal.target?.[0]?.measure?.coding?.[0]?.code,
    };
  }
}
