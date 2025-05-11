// `src/converters/person_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPerson } from '../types/resources/Person';

export class PersonExtractor extends BaseResourceExtractor<TPerson> {
  async extract(person: TPerson): Promise<Record<string, ExtractorValueType>> {
    return {
      id: person.id,
      name1: this.convertHumanName(person.name?.[0]),
      name2: this.convertHumanName(person.name?.[1]),
      name3: this.convertHumanName(person.name?.[2]),
      gender: person.gender,
      birthDate: this.convertDateTime(person.birthDate),
      address1: this.convertAddress(person.address?.[0]),
      address2: this.convertAddress(person.address?.[1]),
      address3: this.convertAddress(person.address?.[2]),
      telecom1: this.convertContactPoint(person.telecom?.[0]),
      telecom2: this.convertContactPoint(person.telecom?.[1]),
      telecom3: this.convertContactPoint(person.telecom?.[2]),
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