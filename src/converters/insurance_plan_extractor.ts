// `src/converters/insurance_plan_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TInsurancePlan } from '../types/resources/InsurancePlan';

export class InsurancePlanExtractor extends BaseResourceExtractor<TInsurancePlan> {
  async extract(insurancePlan: TInsurancePlan): Promise<Record<string, ExtractorValueType>> {
    return {
      id: insurancePlan.id,
      name: insurancePlan.name,
      alias1: insurancePlan.alias?.[0],
      alias2: insurancePlan.alias?.[1],
      alias3: insurancePlan.alias?.[2],
      periodStart: this.convertDateTime(
        insurancePlan.period?.start
      ),
      periodEnd: this.convertDateTime(
        insurancePlan.period?.end
      ),
      ownedBy: this.convertReference(insurancePlan.ownedBy),
      type1: this.convertCodeableConcept(
        insurancePlan.type?.[0]
      ),
      type2: this.convertCodeableConcept(
        insurancePlan.type?.[1]
      ),
      type3: this.convertCodeableConcept(
        insurancePlan.type?.[2]
      ),
      coverageArea1: this.convertReference(
        insurancePlan.coverageArea?.[0]
      ),
      coverageArea2: this.convertReference(
        insurancePlan.coverageArea?.[1]
      ),
      coverageArea3: this.convertReference(
        insurancePlan.coverageArea?.[2]
      ),
      plan1Identifier1: this.convertIdentifier(
        insurancePlan.plan?.[0]?.identifier?.[0]
      ),
      plan1Identifier2: this.convertIdentifier(
        insurancePlan.plan?.[0]?.identifier?.[1]
      ),
      plan1Identifier3: this.convertIdentifier(
        insurancePlan.plan?.[0]?.identifier?.[2]
      ),
      plan2Identifier1: this.convertIdentifier(
        insurancePlan.plan?.[1]?.identifier?.[0]
      ),
      plan2Identifier2: this.convertIdentifier(
        insurancePlan.plan?.[1]?.identifier?.[1]
      ),
      plan2Identifier3: this.convertIdentifier(
        insurancePlan.plan?.[1]?.identifier?.[2]
      ),
      plan3Identifier1: this.convertIdentifier(
        insurancePlan.plan?.[2]?.identifier?.[0]
      ),
      plan3Identifier2: this.convertIdentifier(
        insurancePlan.plan?.[2]?.identifier?.[1]
      ),
      plan3Identifier3: this.convertIdentifier(
        insurancePlan.plan?.[2]?.identifier?.[2]
      ),
    };
  }
}