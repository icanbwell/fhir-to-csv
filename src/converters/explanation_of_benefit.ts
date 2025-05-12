import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TExplanationOfBenefit } from '../types/resources/ExplanationOfBenefit';

export class ExplanationOfBenefitExtractor extends BaseResourceExtractor<TExplanationOfBenefit> {
  extract(eob: TExplanationOfBenefit): Record<string, ExtractorValueType> {
    return {
      id: eob.id,
      status: eob.status,
      ...this.getCodeableConceptFields(
        eob.type,
        'type'
      ),
      patient: this.convertReference(eob.patient),
      created: this.convertDateTime(eob.created),
      insurer: this.convertReference(eob.insurer),
      provider: this.convertReference(eob.provider),
      priority: this.convertCodeableConcept(eob.priority),
      paymentAmount: eob.payment?.amount?.value,
      paymentCurrency: eob.payment?.amount?.currency,

      ...this.getCodeableConceptFields(
        eob.diagnosis?.[0]?.diagnosisCodeableConcept,
        'diagnosis1'
      ),
      diagnosis2: this.convertCodeableConcept(
        eob.diagnosis?.[1]?.diagnosisCodeableConcept
      ),
      diagnosis3: this.convertCodeableConcept(
        eob.diagnosis?.[2]?.diagnosisCodeableConcept
      ),
      diagnosis4: this.convertCodeableConcept(
        eob.diagnosis?.[3]?.diagnosisCodeableConcept
      ),
      diagnosis5: this.convertCodeableConcept(
        eob.diagnosis?.[4]?.diagnosisCodeableConcept
      ),

      ...this.getCodeableConceptFields(
        eob.procedure?.[0]?.procedureCodeableConcept,
        'procedure1'
      ),
      procedure2: this.convertCodeableConcept(
        eob.procedure?.[1]?.procedureCodeableConcept
      ),
      procedure3: this.convertCodeableConcept(
        eob.procedure?.[2]?.procedureCodeableConcept
      ),
      procedure4: this.convertCodeableConcept(
        eob.procedure?.[3]?.procedureCodeableConcept
      ),
      procedure5: this.convertCodeableConcept(
        eob.procedure?.[4]?.procedureCodeableConcept
      ),

      item1Sequence: eob.item?.[0]?.sequence,
      ...this.getCodeableConceptFields(
        eob.item?.[0]?.productOrService,
        'item1Service'
      ),
      item1Net: eob.item?.[0]?.net?.value,
      item1NetCurrency: eob.item?.[0]?.net?.currency,
      item2Sequence: eob.item?.[1]?.sequence,
      item2Service: this.convertCodeableConcept(
        eob.item?.[1]?.productOrService
      ),
      item2Net: eob.item?.[1]?.net?.value,
      item2NetCurrency: eob.item?.[1]?.net?.currency,
      item3Sequence: eob.item?.[2]?.sequence,
      item3Service: this.convertCodeableConcept(
        eob.item?.[2]?.productOrService
      ),
      item3Net: eob.item?.[2]?.net?.value,
      item3NetCurrency: eob.item?.[2]?.net?.currency,
      item4Sequence: eob.item?.[3]?.sequence,
      item4Service: this.convertCodeableConcept(
        eob.item?.[3]?.productOrService
      ),
      item4Net: eob.item?.[3]?.net?.value,
      item4NetCurrency: eob.item?.[3]?.net?.currency,
      item5Sequence: eob.item?.[4]?.sequence,
      item5Service: this.convertCodeableConcept(
        eob.item?.[4]?.productOrService
      ),
      item5Net: eob.item?.[4]?.net?.value,
      item5NetCurrency: eob.item?.[4]?.net?.currency,
      item6Sequence: eob.item?.[5]?.sequence,
      item6Service: this.convertCodeableConcept(
        eob.item?.[5]?.productOrService
      ),
      item6Net: eob.item?.[5]?.net?.value,
      item6NetCurrency: eob.item?.[5]?.net?.currency,
      item7Sequence: eob.item?.[6]?.sequence,
      item7Service: this.convertCodeableConcept(
        eob.item?.[6]?.productOrService
      ),
      item7Net: eob.item?.[6]?.net?.value,
      item7NetCurrency: eob.item?.[6]?.net?.currency,
      item8Sequence: eob.item?.[7]?.sequence,
      item8Service: this.convertCodeableConcept(
        eob.item?.[7]?.productOrService
      ),
      item8Net: eob.item?.[7]?.net?.value,
      item8NetCurrency: eob.item?.[7]?.net?.currency,
      item9Sequence: eob.item?.[8]?.sequence,
      item9Service: this.convertCodeableConcept(
        eob.item?.[8]?.productOrService
      ),
      item9Net: eob.item?.[8]?.net?.value,
      item9NetCurrency: eob.item?.[8]?.net?.currency,
      item10Sequence: eob.item?.[9]?.sequence,
      item10Service: this.convertCodeableConcept(
        eob.item?.[9]?.productOrService
      ),
      item10Net: eob.item?.[9]?.net?.value,
      item10NetCurrency: eob.item?.[9]?.net?.currency,

      total1Category: this.convertCodeableConcept(
        eob.total?.[0]?.category
      ),
      total1Amount: eob.total?.[0]?.amount?.value,
      total1Currency: eob.total?.[0]?.amount?.currency,
      total2Category: this.convertCodeableConcept(
        eob.total?.[1]?.category
      ),
      total2Amount: eob.total?.[1]?.amount?.value,
      total2Currency: eob.total?.[1]?.amount?.currency,
      total3Category: this.convertCodeableConcept(
        eob.total?.[2]?.category
      ),
      total3Amount: eob.total?.[2]?.amount?.value,
      total3Currency: eob.total?.[2]?.amount?.currency,
      total4Category: this.convertCodeableConcept(
        eob.total?.[3]?.category
      ),
      total4Amount: eob.total?.[3]?.amount?.value,
      total4Currency: eob.total?.[3]?.amount?.currency,
      total5Category: this.convertCodeableConcept(
        eob.total?.[4]?.category
      ),
      total5Amount: eob.total?.[4]?.amount?.value,
      total5Currency: eob.total?.[4]?.amount?.currency,
      total6Category: this.convertCodeableConcept(
        eob.total?.[5]?.category
      ),
      total6Amount: eob.total?.[5]?.amount?.value,
      total6Currency: eob.total?.[5]?.amount?.currency,
      total7Category: this.convertCodeableConcept(
        eob.total?.[6]?.category
      ),
      total7Amount: eob.total?.[6]?.amount?.value,
      total7Currency: eob.total?.[6]?.amount?.currency,
      total8Category: this.convertCodeableConcept(
        eob.total?.[7]?.category
      ),
      total8Amount: eob.total?.[7]?.amount?.value,
      total8Currency: eob.total?.[7]?.amount?.currency,
      total9Category: this.convertCodeableConcept(
        eob.total?.[8]?.category
      ),
      total9Amount: eob.total?.[8]?.amount?.value,
      total9Currency: eob.total?.[8]?.amount?.currency,
      total10Category: this.convertCodeableConcept(
        eob.total?.[9]?.category
      ),
      total10Amount: eob.total?.[9]?.amount?.value,
      total10Currency: eob.total?.[9]?.amount?.currency,
    };
  }
}