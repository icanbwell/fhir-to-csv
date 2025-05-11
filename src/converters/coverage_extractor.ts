import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCoverage } from '../types/resources/Coverage';

export class CoverageExtractor extends BaseResourceExtractor<TCoverage> {
  async extract(
    coverage: TCoverage
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: coverage.id,
      status: coverage.status,
      type: this.convertCodeableConcept(coverage.type),
      subscriberId: coverage.subscriberId,
      beneficiaryId: this.getReferenceId(coverage.beneficiary),
      period: this.convertPeriod(coverage.period),
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
