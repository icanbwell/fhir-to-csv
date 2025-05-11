import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCondition } from '../types/resources/Condition';

export class ConditionExtractor extends BaseResourceExtractor<TCondition> {
  async extract(
    condition: TCondition
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: condition.id,
      patientId: this.getReferenceId(condition.subject),
      clinicalStatus: this.convertCodeableConcept(condition.clinicalStatus),
      verificationStatus: this.convertCodeableConcept(
        condition.verificationStatus
      ),
      category1: this.convertCodeableConcept(
        condition.category?.[0]
      ),
      category2: this.convertCodeableConcept(
        condition.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        condition.category?.[2]
      ),
      severity: this.convertCodeableConcept(condition.severity),
      code: this.convertCodeableConcept(condition.code),
      bodySite1: this.convertCodeableConcept(
        condition.bodySite?.[0]
      ),
      bodySite2: this.convertCodeableConcept(
        condition.bodySite?.[1]
      ),
      bodySite3: this.convertCodeableConcept(
        condition.bodySite?.[2]
      ),
      onset: this.convertDateTime(condition.onsetDateTime),
      abatement: this.convertDateTime(condition.abatementDateTime),
      recordedDate: this.convertDateTime(condition.recordedDate),
    };
  }
}
