import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPractitionerRole } from '../types/resources/PractitionerRole';

export class PractitionerRoleExtractor extends BaseResourceExtractor<TPractitionerRole> {
  async extract(
    practitionerRole: TPractitionerRole
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: practitionerRole.id,
      practitionerId: this.getReferenceId(practitionerRole.practitioner),
      organizationId: this.getReferenceId(practitionerRole.organization),
      active: practitionerRole.active,

      ...this.getCodeableConceptFields(
        practitionerRole.specialty?.[0],
        'specialty1'
      ),
      ...this.getCodeableConceptFields(
        practitionerRole.specialty?.[1],
        'specialty2'
      ),
      ...this.getCodeableConceptFields(
        practitionerRole.specialty?.[2],
        'specialty3'
      ),
      ...this.getCodeableConceptFields(
        practitionerRole.specialty?.[3],
        'specialty4'
      ),
      ...this.getCodeableConceptFields(
        practitionerRole.specialty?.[4],
        'specialty5'
      ),

      ...this.getCodeableConceptFields(
        practitionerRole.code?.[0],
        'code1'
      ),
      code2: this.convertCodeableConcept(
        practitionerRole.code?.[1]
      ),
      code3: this.convertCodeableConcept(
        practitionerRole.code?.[2]
      ),
      code4: this.convertCodeableConcept(
        practitionerRole.code?.[3]
      ),
      code5: this.convertCodeableConcept(
        practitionerRole.code?.[4]
      ),
      location1: this.convertReference(
        practitionerRole.location?.[0]
      ),
      location2: this.convertReference(
        practitionerRole.location?.[1]
      ),
      location3: this.convertReference(
        practitionerRole.location?.[2]
      ),
      location4: this.convertReference(
        practitionerRole.location?.[3]
      ),
      location5: this.convertReference(
        practitionerRole.location?.[4]
      ),
      healthcareService1: this.convertReference(
        practitionerRole.healthcareService?.[0]
      ),
      healthcareService2: this.convertReference(
        practitionerRole.healthcareService?.[1]
      ),
      healthcareService3: this.convertReference(
        practitionerRole.healthcareService?.[2]
      ),
      healthcareService4: this.convertReference(
        practitionerRole.healthcareService?.[3]
      ),
      healthcareService5: this.convertReference(
        practitionerRole.healthcareService?.[4]
      ),
      email1: this.getEmail(practitionerRole.telecom, 0),
      email2: this.getEmail(practitionerRole.telecom, 1),
      email3: this.getEmail(practitionerRole.telecom, 2),
      phone1: this.getPhone(practitionerRole.telecom, 0),
      phone2: this.getPhone(practitionerRole.telecom, 1),
      phone3: this.getPhone(practitionerRole.telecom, 2),
    };
  }
}
