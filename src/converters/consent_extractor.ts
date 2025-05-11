// `src/converters/consent_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TConsent } from '../types/resources/Consent';

export class ConsentExtractor extends BaseResourceExtractor<TConsent> {
  async extract(consent: TConsent): Promise<Record<string, ExtractorValueType>> {
    return {
      id: consent.id,
      status: consent.status,
      scope: this.convertCodeableConcept(consent.scope),
      category1: this.convertCodeableConcept(consent.category?.[0]),
      category2: this.convertCodeableConcept(consent.category?.[1]),
      category3: this.convertCodeableConcept(consent.category?.[2]),
      patient: this.convertReference(consent.patient),
      dateTime: this.convertDateTime(consent.dateTime),
      performer1: this.convertReference(consent.performer?.[0]),
      performer2: this.convertReference(consent.performer?.[1]),
      performer3: this.convertReference(consent.performer?.[2]),
      organization1: this.convertReference(consent.organization?.[0]),
      organization2: this.convertReference(consent.organization?.[1]),
      organization3: this.convertReference(consent.organization?.[2]),
      sourceAttachment: consent.sourceAttachment?.url,
      sourceReference: this.convertReference(consent.sourceReference),
      policy1: consent.policy?.[0]?.uri,
      policy2: consent.policy?.[1]?.uri,
      policy3: consent.policy?.[2]?.uri,
      provisionType: consent.provision?.type,
      provisionPeriodStart: this.convertDateTime(consent.provision?.period?.start),
      provisionPeriodEnd: this.convertDateTime(consent.provision?.period?.end),
    };
  }
}