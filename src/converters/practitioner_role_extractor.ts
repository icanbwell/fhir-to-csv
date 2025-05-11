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
      specialty1: this.convertCodeableConcept(
        practitionerRole.specialty?.[0]
      ),
      specialty2: this.convertCodeableConcept(
        practitionerRole.specialty?.[1]
      ),
      specialty3: this.convertCodeableConcept(
        practitionerRole.specialty?.[2]
      ),
      specialty4: this.convertCodeableConcept(
        practitionerRole.specialty?.[3]
      ),
      specialty5: this.convertCodeableConcept(
        practitionerRole.specialty?.[4]
      ),
      code1: this.convertCodeableConcept(
        practitionerRole.code?.[0]
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
      telecom1: this.convertContactPoint(
        practitionerRole.telecom?.[0]
      ),
      telecom2: this.convertContactPoint(
        practitionerRole.telecom?.[1]
      ),
      telecom3: this.convertContactPoint(
        practitionerRole.telecom?.[2]
      )
    };
  }
}
