// `src/converters/healthcare_service_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { THealthcareService } from '../types/resources/HealthcareService';

export class HealthcareServiceExtractor extends BaseResourceExtractor<THealthcareService> {
  async extract(healthcareService: THealthcareService): Promise<Record<string, ExtractorValueType>> {
    return {
      id: healthcareService.id,
      active: healthcareService.active,
      name: healthcareService.name,
      category1: this.convertCodeableConcept(
        healthcareService.category?.[0]
      ),
      category2: this.convertCodeableConcept(
        healthcareService.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        healthcareService.category?.[2]
      ),
      type1: this.convertCodeableConcept(
        healthcareService.type?.[0]
      ),
      type2: this.convertCodeableConcept(
        healthcareService.type?.[1]
      ),
      type3: this.convertCodeableConcept(
        healthcareService.type?.[2]
      ),
      specialty1: this.convertCodeableConcept(
        healthcareService.specialty?.[0]
      ),
      specialty2: this.convertCodeableConcept(
        healthcareService.specialty?.[1]
      ),
      specialty3: this.convertCodeableConcept(
        healthcareService.specialty?.[2]
      ),
      location1: this.convertReference(
        healthcareService.location?.[0]
      ),
      location2: this.convertReference(
        healthcareService.location?.[1]
      ),
      location3: this.convertReference(
        healthcareService.location?.[2]
      ),
      telecom1: this.convertContactPoint(
        healthcareService.telecom?.[0]
      ),
      telecom2: this.convertContactPoint(
        healthcareService.telecom?.[1]
      ),
      telecom3: this.convertContactPoint(
        healthcareService.telecom?.[2]
      ),
      coverageArea1: this.convertReference(
        healthcareService.coverageArea?.[0]
      ),
      coverageArea2: this.convertReference(
        healthcareService.coverageArea?.[1]
      ),
      coverageArea3: this.convertReference(
        healthcareService.coverageArea?.[2]
      ),
      serviceProvisionCode1: this.convertCodeableConcept(
        healthcareService.serviceProvisionCode?.[0]
      ),
      serviceProvisionCode2: this.convertCodeableConcept(
        healthcareService.serviceProvisionCode?.[1]
      ),
      serviceProvisionCode3: this.convertCodeableConcept(
        healthcareService.serviceProvisionCode?.[2]
      ),
      eligibility1: this.convertCodeableConcept(
        healthcareService.eligibility?.[0]?.code
      ),
      eligibility1Comment: healthcareService.eligibility?.[0]?.comment,
      eligibility2: this.convertCodeableConcept(
        healthcareService.eligibility?.[1]?.code
      ),
      eligibility2Comment: healthcareService.eligibility?.[1]?.comment,
      eligibility3: this.convertCodeableConcept(
        healthcareService.eligibility?.[2]?.code
      ),
      eligibility3Comment: healthcareService.eligibility?.[2]?.comment,
      program1: this.convertCodeableConcept(
        healthcareService.program?.[0]
      ),
      program2: this.convertCodeableConcept(
        healthcareService.program?.[1]
      ),
      program3: this.convertCodeableConcept(
        healthcareService.program?.[2]
      ),
      characteristic1: this.convertCodeableConcept(
        healthcareService.characteristic?.[0]
      ),
      characteristic2: this.convertCodeableConcept(
        healthcareService.characteristic?.[1]
      ),
      characteristic3: this.convertCodeableConcept(
        healthcareService.characteristic?.[2]
      ),
      communication1: this.convertCodeableConcept(
        healthcareService.communication?.[0]
      ),
      communication2: this.convertCodeableConcept(
        healthcareService.communication?.[1]
      ),
      communication3: this.convertCodeableConcept(
        healthcareService.communication?.[2]
      ),
      referralMethod1: this.convertCodeableConcept(
        healthcareService.referralMethod?.[0]
      ),
      referralMethod2: this.convertCodeableConcept(
        healthcareService.referralMethod?.[1]
      ),
      referralMethod3: this.convertCodeableConcept(
        healthcareService.referralMethod?.[2]
      ),
      appointmentRequired: healthcareService.appointmentRequired,
    };
  }
}