import { BaseResourceExtractor } from './base_extractor';
import { TCondition } from '../types/resources/Condition';

export class ConditionExtractor extends BaseResourceExtractor<TCondition> {
  async extract(condition: TCondition): Promise<Record<string, any>> {
    return {
      id: condition.id,
      patientId: condition.subject?.reference?.split('/')[1],
      clinicalStatus: condition.clinicalStatus?.coding?.[0]?.display,
      verificationStatus: condition.verificationStatus?.coding?.[0]?.display,
      category: condition.category?.[0]?.coding?.[0]?.display,
      code: condition.code?.coding?.[0]?.code,
      codeDisplay: condition.code?.coding?.[0]?.display,
      onsetDateTime: condition.onsetDateTime,
      abatementDateTime: condition.abatementDateTime,
      severity: condition.severity?.coding?.[0]?.display,
    };
  }
}
