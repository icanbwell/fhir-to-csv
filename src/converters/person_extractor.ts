// `src/converters/person_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPerson } from '../types/resources/Person';

export class PersonExtractor extends BaseResourceExtractor<TPerson> {
  async extract(person: TPerson): Promise<Record<string, ExtractorValueType>> {
    return {
      id: person.id,
      ...this.getHumanNameFields(
        person.name?.[0],
        'name1'
      ),
      ...this.getHumanNameFields(
        person.name?.[1],
        'name2'
      ),
      ...this.getHumanNameFields(
        person.name?.[2],
        'name3'
      ),
      gender: person.gender,
      birthDate: this.convertDateTime(person.birthDate),
      ...this.getAddressFields(
        person.address?.[0],
        'address1'
      ),
      ...this.getAddressFields(
        person.address?.[1],
        'address2'
      ),
      ...this.getAddressFields(
        person.address?.[2],
        'address3'
      ),
      email1: this.getEmail(person.telecom, 0),
      email2: this.getEmail(person.telecom, 1),
      email3: this.getEmail(person.telecom, 2),
      phone1: this.getPhone(person.telecom, 0),
      phone2: this.getPhone(person.telecom, 1),
      phone3: this.getPhone(person.telecom, 2),
      managingOrganization: this.convertReference(person.managingOrganization),
      link1: this.convertReference(
        person.link?.[0]?.target
      ),
      link1Assurance: person.link?.[0]?.assurance,
      link2: this.convertReference(
        person.link?.[1]?.target
      ),
      link2Assurance: person.link?.[1]?.assurance,
      link3: this.convertReference(
        person.link?.[2]?.target
      ),
      link3Assurance: person.link?.[2]?.assurance,
      link4: this.convertReference(
        person.link?.[3]?.target
      ),
      link4Assurance: person.link?.[3]?.assurance,
      link5: this.convertReference(
        person.link?.[4]?.target
      ),
      link5Assurance: person.link?.[4]?.assurance,
      link6: this.convertReference(
        person.link?.[5]?.target
      ),
      link6Assurance: person.link?.[5]?.assurance,
      link7: this.convertReference(
        person.link?.[6]?.target
      ),
      link7Assurance: person.link?.[6]?.assurance,
      link8: this.convertReference(
        person.link?.[7]?.target
      ),
      link8Assurance: person.link?.[7]?.assurance,
      link9: this.convertReference(
        person.link?.[8]?.target
      ),
      link9Assurance: person.link?.[8]?.assurance,
      link10: this.convertReference(
        person.link?.[9]?.target
      ),
      link10Assurance: person.link?.[9]?.assurance,
    };
  }
}