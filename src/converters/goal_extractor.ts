import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TGoal } from '../types/resources/Goal';

export class GoalExtractor extends BaseResourceExtractor<TGoal> {
  extract(goal: TGoal): Record<string, ExtractorValueType> {
    return {
      id: goal.id,
      patientId: this.getReferenceId(goal.subject),
      lifecycleStatus: goal.lifecycleStatus,
      description: goal.description?.text,

      ...this.getCodeableConceptFields(
        goal.target?.[0]?.detailCodeableConcept,
        'target1'
      ),
      target2: this.convertCodeableConcept(
        goal.target?.[0]?.detailQuantity
      ),
      target3: this.convertCodeableConcept(
        goal.target?.[0]?.detailRange
      ),
      dueDate1: this.convertDateTime(goal.target?.[0]?.dueDate),
      dueDate2: this.convertDateTime(goal.target?.[1]?.dueDate),
      dueDate3: this.convertDateTime(goal.target?.[2]?.dueDate),
    };
  }
}
