import { BaseResourceExtractor } from './base_extractor';
import { TCoverage } from '../types/resources/Coverage';

export class CoverageExtractor extends BaseResourceExtractor<TCoverage> {
  async extract(coverage: TCoverage): Promise<Record<string, any>> {
    return {
      id: coverage.id,
      status: coverage.status,
      typeCode: coverage.type?.coding?.[0]?.code,
      typeDisplay: coverage.type?.coding?.[0]?.display,
      subscriberId: coverage.subscriber?.reference?.split('/')?.pop(),
      beneficiaryId: coverage.beneficiary?.reference?.split('/')?.pop(),
      dependent: coverage.dependent,
      relationshipCode: coverage.relationship?.coding?.[0]?.code,
      relationshipDisplay: coverage.relationship?.coding?.[0]?.display,
      periodStart: coverage.period?.start?.toString(),
      periodEnd: coverage.period?.end?.toString(),
      payor: coverage.payor?.map(payor => payor.reference?.split('/')?.pop()),
      class: coverage.class_?.map(cls => ({
        type: cls.type?.coding?.[0]?.code,
        value: cls.value,
      })),
    };
  }
}
