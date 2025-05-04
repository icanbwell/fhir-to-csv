import { BaseResourceExtractor } from './base_extractor';
import { TCondition } from '../types/resources/Condition';

export class ConditionExtractor extends BaseResourceExtractor<TCondition> {
  extract(condition: TCondition): Record<string, any> {
    return {
      id: condition.id,
      patientId: condition.subject?.reference?.split('/')?.pop(),
      clinicalStatus: condition.clinicalStatus?.coding?.[0]?.code,
      verificationStatus: condition.verificationStatus?.coding?.[0]?.code,
      category: condition.category?.[0]?.coding?.[0]?.code,
      code: condition.code?.coding?.[0]?.code,
      codeDisplay: condition.code?.coding?.[0]?.display,
      onsetDatetime: condition.onsetDateTime?.toString(),
      recordedDate: condition.recordedDate?.toString(),
    };
  }
}
