import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TGoal } from '../types/resources/Goal';

export class GoalExtractor extends BaseResourceExtractor<TGoal> {
  async extract(goal: TGoal): Promise<Record<string, ExtractorValueType>> {
    return {
      id: goal.id,
      patientId: this.getReferenceId(goal.subject),
      lifecycleStatus: goal.lifecycleStatus,
      description: goal.description?.text,
      target: this.convertCodeableConcept(goal.target?.[0]?.measure),
      dueDate: this.convertDateTime(goal.target?.[0]?.dueDate),
    };
  }
}
