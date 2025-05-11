import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedicationDispense } from '../types/resources/MedicationDispense';

export class MedicationDispenseExtractor extends BaseResourceExtractor<TMedicationDispense> {
  extract(
    medicationDispense: TMedicationDispense
  ): Record<string, ExtractorValueType> {
    return {
      id: medicationDispense.id,
      status: medicationDispense.status,
      ...this.getCodeableConceptFields(
        medicationDispense.medicationCodeableConcept,
        'medication'
      ),
      subjectId: this.getReferenceId(medicationDispense.subject),
      performer1: this.convertReference(medicationDispense.performer?.[0]?.actor),
      performer2: this.convertReference(medicationDispense.performer?.[1]?.actor),
      performer3: this.convertReference(medicationDispense.performer?.[2]?.actor),
      quantity: medicationDispense.quantity?.value,
      daysSupply: medicationDispense.daysSupply?.value,
      whenPrepared: this.convertDateTime(medicationDispense.whenPrepared),
      whenHandedOver: this.convertDateTime(medicationDispense.whenHandedOver),
      destination: this.convertReference(medicationDispense.destination),
      note1: medicationDispense.note?.[0]?.text,
      note2: medicationDispense.note?.[1]?.text,
      note3: medicationDispense.note?.[2]?.text,
      dosageInstruction1dosage1: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[0]?.doseAndRate?.[0]),
      dosageInstruction1dosage2: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[0]?.doseAndRate?.[1]),
      dosageInstruction1dosage3: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[0]?.doseAndRate?.[2]),
      dosageInstruction2dosage1: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[1]?.doseAndRate?.[0]),
      dosageInstruction2dosage2: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[1]?.doseAndRate?.[1]),
      dosageInstruction2dosage3: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[1]?.doseAndRate?.[2]),
      dosageInstruction3dosage1: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[2]?.doseAndRate?.[0]),
      dosageInstruction3dosage2: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[2]?.doseAndRate?.[1]),
      dosageInstruction3dosage3: this.convertDosageAndRate(medicationDispense.dosageInstruction?.[2]?.doseAndRate?.[2]),
      substitution: this.convertCodeableConcept(medicationDispense.substitution?.type)
    };
  }
}