import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPatient } from '../types/resources/Patient';

export class PatientExtractor extends BaseResourceExtractor<TPatient> {
  async extract(
    patient: TPatient
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: patient.id,
      identifier1: this.convertIdentifier(patient.identifier?.[0]),
      identifier2: this.convertIdentifier(patient.identifier?.[1]),
      identifier3: this.convertIdentifier(patient.identifier?.[2]),
      identifier4: this.convertIdentifier(patient.identifier?.[3]),
      identifier5: this.convertIdentifier(patient.identifier?.[4]),
      name1: this.convertHumanName(patient.name?.[0]),
      name2: this.convertHumanName(patient.name?.[1]),
      name3: this.convertHumanName(patient.name?.[2]),
      name4: this.convertHumanName(patient.name?.[3]),
      name5: this.convertHumanName(patient.name?.[4]),
      active: patient.active,
      gender: patient.gender,
      birthSex: this.getExtensionValueByUrl(
        patient.extension,
        'http://hl7.org/fhir/StructureDefinition/us-core-birthsex'
      ),
      sex: this.getExtensionValueByUrl(
        patient.extension,
        'http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex'
      ),
      race: this.getExtensionValueByUrl(
        patient.extension,
        'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race'
      ),
      ethnicity: this.getExtensionValueByUrl(
        patient.extension,
        'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity'
      ),
      birthDate: this.convertDateTime(patient.birthDate),
      address1: this.convertAddress(patient.address?.[0]),
      address2: this.convertAddress(patient.address?.[1]),
      address3: this.convertAddress(patient.address?.[2]),
      address4: this.convertAddress(patient.address?.[3]),
      address5: this.convertAddress(patient.address?.[4]),
      email1: this.getEmail(patient.telecom, 0),
      email2: this.getEmail(patient.telecom, 1),
      email3: this.getEmail(patient.telecom, 2),
      phone1: this.getPhone(patient.telecom, 0),
      phone2: this.getPhone(patient.telecom, 1),
      phone3: this.getPhone(patient.telecom, 2),
      maritalStatus: this.convertCodeableConcept(patient.maritalStatus),
      communication1Language: this.convertCodeableConcept(
        patient.communication?.[0]?.language
      ),
      communication1Preferred: patient.communication?.[0]?.preferred,
      communication2Language: this.convertCodeableConcept(
        patient.communication?.[1]?.language
      ),
      communication2Preferred: patient.communication?.[1]?.preferred,
      communication3Language: this.convertCodeableConcept(
        patient.communication?.[2]?.language
      ),
      communication3Preferred: patient.communication?.[2]?.preferred,
      deceased: patient.deceasedBoolean || patient.deceasedDateTime,
      deceasedDateTime: this.convertDateTime(patient.deceasedDateTime),
    };
  }
}
