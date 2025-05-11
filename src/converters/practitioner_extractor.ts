import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPractitioner } from '../types/resources/Practitioner';

export class PractitionerExtractor extends BaseResourceExtractor<TPractitioner> {
  async extract(
    practitioner: TPractitioner
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: practitioner.id,
      ...this.getHumanNameFields(
        practitioner.name?.[0],
        'name1'
      ),
      ...this.getHumanNameFields(
        practitioner.name?.[1],
        'name2'
      ),
      ...this.getHumanNameFields(
        practitioner.name?.[2],
        'name3'
      ),
      gender: practitioner.gender,
      birthDate: this.convertDateTime(practitioner.birthDate),
      email1: this.getEmail(practitioner.telecom, 0),
      email2: this.getEmail(practitioner.telecom, 1),
      email3: this.getEmail(practitioner.telecom, 2),
      phone1: this.getPhone(practitioner.telecom, 0),
      phone2: this.getPhone(practitioner.telecom, 1),
      phone3: this.getPhone(practitioner.telecom, 2),
      ...this.getAddressFields(
        practitioner.address?.[0],
        'address1'
      ),
      ...this.getAddressFields(
        practitioner.address?.[1],
        'address2'
      ),
      ...this.getAddressFields(
        practitioner.address?.[2],
        'address3'
      ),
      ...this.getAddressFields(
        practitioner.address?.[3],
        'address4'
      ),
      ...this.getAddressFields(
        practitioner.address?.[4],
        'address5'
      ),
      qualification1: this.convertCodeableConcept(
        practitioner.qualification?.[0]?.code
      ),
      qualification1Issuer: this.convertReference(
        practitioner.qualification?.[0]?.issuer
      ),
      qualification2: this.convertCodeableConcept(
        practitioner.qualification?.[1]?.code
      ),
      qualification2Issuer: this.convertReference(
        practitioner.qualification?.[1]?.issuer
      ),
      qualification3: this.convertCodeableConcept(
        practitioner.qualification?.[2]?.code
      ),
      qualification3Issuer: this.convertReference(
        practitioner.qualification?.[2]?.issuer
      ),
      qualification4: this.convertCodeableConcept(
        practitioner.qualification?.[3]?.code
      ),
      qualification4Issuer: this.convertReference(
        practitioner.qualification?.[3]?.issuer
      ),
      qualification5: this.convertCodeableConcept(
        practitioner.qualification?.[4]?.code
      ),
      qualification5Issuer: this.convertReference(
        practitioner.qualification?.[4]?.issuer
      ),
      communication1: this.convertCodeableConcept(
        practitioner.communication?.[0]
      ),
      communication2: this.convertCodeableConcept(
        practitioner.communication?.[1]
      ),
      communication3: this.convertCodeableConcept(
        practitioner.communication?.[2]
      ),
      active: practitioner.active,

      identifier1: this.convertIdentifier(
        practitioner.identifier?.[0]
      ),
      identifier2: this.convertIdentifier(
        practitioner.identifier?.[1]
      ),
      identifier3: this.convertIdentifier(
        practitioner.identifier?.[2]
      ),
      identifier4: this.convertIdentifier(
        practitioner.identifier?.[3]
      ),
      identifier5: this.convertIdentifier(
        practitioner.identifier?.[4]
      ),
    };
  }
}
