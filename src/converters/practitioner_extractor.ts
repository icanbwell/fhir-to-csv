import { BaseResourceExtractor } from './base_extractor';
import { TPractitioner } from '../types/resources/Practitioner';

export class PractitionerExtractor extends BaseResourceExtractor<TPractitioner> {
  extract(practitioner: TPractitioner): Record<string, any> {
    return {
      id: practitioner.id,
      nameGiven: practitioner.name?.[0]?.given?.[0],
      nameFamily: practitioner.name?.[0]?.family,
      namePrefix: practitioner.name?.[0]?.prefix?.[0],
      gender: practitioner.gender,
      birthDate: practitioner.birthDate?.toString(),
      qualifications: practitioner.qualification?.map(qual => ({
        code: qual.code?.coding?.[0]?.code,
        display: qual.code?.coding?.[0]?.display,
        issuer: qual.issuer?.display,
      })),
      communicationLanguages: practitioner.communication?.map(
        lang => lang.coding?.[0]?.code
      ),
    };
  }
}
