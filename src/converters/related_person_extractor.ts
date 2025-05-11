import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TRelatedPerson } from '../types/resources/RelatedPerson';

export class RelatedPersonExtractor extends BaseResourceExtractor<TRelatedPerson> {
  async extract(relatedPerson: TRelatedPerson): Promise<Record<string, ExtractorValueType>> {
    return {
      id: relatedPerson.id,
      name1: this.convertHumanName(relatedPerson.name?.[0]),
      name2: this.convertHumanName(relatedPerson.name?.[1]),
      name3: this.convertHumanName(relatedPerson.name?.[2]),
      relationship1: this.convertCodeableConcept(
        relatedPerson.relationship?.[0]
      ),
      relationship2: this.convertCodeableConcept(
        relatedPerson.relationship?.[1]
      ),
      relationship3: this.convertCodeableConcept(
        relatedPerson.relationship?.[2]
      ),
      gender: relatedPerson.gender,
      birthDate: this.convertDateTime(relatedPerson.birthDate),
    };
  }
}