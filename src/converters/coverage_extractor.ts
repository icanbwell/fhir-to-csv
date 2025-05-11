import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCoverage } from '../types/resources/Coverage';

export class CoverageExtractor extends BaseResourceExtractor<TCoverage> {
  extract(
    coverage: TCoverage
  ): Record<string, ExtractorValueType> {
    return {
      id: coverage.id,
      patientId: this.getReferenceId(coverage.beneficiary),

      ...this.getIdentifierFields(
        coverage.identifier?.[0],
        'identifier1'
      ),
      ...this.getIdentifierFields(
        coverage.identifier?.[1],
        'identifier2'
      ),
      ...this.getIdentifierFields(
        coverage.identifier?.[2],
        'identifier3'
      ),

      status: coverage.status,
      ...this.getCodeableConceptFields(
        coverage.type,
        'type'
      ),
      subscriberId: coverage.subscriberId,
      beneficiaryId: this.getReferenceId(coverage.beneficiary),
      periodStart: this.convertDateTime(
        coverage.period?.start
      ),
      periodEnd: this.convertDateTime(
        coverage.period?.end
      ),
      payor1: this.convertReference(
        coverage.payor?.[0]
      ),
      payor2: this.convertReference(
        coverage.payor?.[1]
      ),
      payor3: this.convertReference(
        coverage.payor?.[2]
      ),
    };
  }
}
