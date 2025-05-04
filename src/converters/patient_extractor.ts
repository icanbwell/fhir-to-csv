import { BaseResourceExtractor } from './base_extractor';
import { TPatient } from '../types/resources/Patient';

export class PatientExtractor extends BaseResourceExtractor<TPatient> {
  extract(patient: TPatient): Record<string, any> {
    return {
      id: patient.id,
      nameGiven: patient.name?.[0]?.given?.[0],
      nameFamily: patient.name?.[0]?.family,
      birthDate: patient.birthDate?.toString(),
      gender: patient.gender,
      race: patient.extension?.[0]?.extension?.[0]?.valueCoding?.display,
      ethnicity: patient.extension?.[1]?.extension?.[0]?.valueCoding?.display,
      addressLine: patient.address?.[0]?.line?.[0],
      addressCity: patient.address?.[0]?.city,
      addressState: patient.address?.[0]?.state,
      telecomPhone: patient.telecom?.find(contact => contact.system === 'phone')
        ?.value,
    };
  }
}
