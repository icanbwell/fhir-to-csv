import { BaseResourceExtractor } from './base_extractor';
import { TPatient } from '../types/resources/Patient';

export class PatientExtractor extends BaseResourceExtractor<TPatient> {
  async extract(patient: TPatient): Promise<Record<string, any>> {
    return {
      sourceId: patient.identifier?.find(
        id => id.system === 'https://www.icanbwell.com/sourceId'
      )?.value,
      nameGiven: patient.name?.[0]?.given?.[0],
      nameFamily: patient.name?.[0]?.family,
      birthDate: patient.birthDate?.toString(),
      gender: patient.gender,
      race: patient.extension?.[0]?.extension?.[0]?.valueCoding?.display,
      ethnicity: patient.extension?.[1]?.extension?.[0]?.valueCoding?.display,
      addressLine: patient.address?.[0]?.line?.[0],
      addressCity: patient.address?.[0]?.city,
      addressState: patient.address?.[0]?.state,
      email: patient.telecom?.find(contact => contact.system === 'email')
        ?.value,
      telecomPhone: patient.telecom?.find(contact => contact.system === 'phone')
        ?.value,
    };
  }
}
