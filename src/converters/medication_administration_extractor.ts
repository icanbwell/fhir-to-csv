// `src/converters/medication_administration_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedicationAdministration } from '../types/resources/MedicationAdministration';

export class MedicationAdministrationExtractor extends BaseResourceExtractor<TMedicationAdministration> {
  extract(medicationAdministration: TMedicationAdministration): Record<string, ExtractorValueType> {
    return {
      id: medicationAdministration.id,
      status: medicationAdministration.status,
      ...this.getCodeableConceptFields(
        medicationAdministration.medicationCodeableConcept,
        'medication'
      ),
      subject: this.convertReference(medicationAdministration.subject),
      effectiveDateTime: this.convertDateTime(medicationAdministration.effectiveDateTime),
      performer1: this.convertReference(medicationAdministration.performer?.[0]?.actor),
      performerFunction1: this.convertCodeableConcept(medicationAdministration.performer?.[0]?.function_),
      performer2: this.convertReference(medicationAdministration.performer?.[1]?.actor),
      performerFunction2: this.convertCodeableConcept(medicationAdministration.performer?.[1]?.function_),
      performer3: this.convertReference(medicationAdministration.performer?.[2]?.actor),
      performerFunction3: this.convertCodeableConcept(medicationAdministration.performer?.[2]?.function_),
    };
  }
}