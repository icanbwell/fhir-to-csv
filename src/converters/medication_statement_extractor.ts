import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedicationStatement } from '../types/resources/MedicationStatement';

export class MedicationStatementExtractor extends BaseResourceExtractor<TMedicationStatement> {
  extract(
    medicationStatement: TMedicationStatement
  ): Record<string, ExtractorValueType> {
    return {
      id: medicationStatement.id,
      patientId: this.getReferenceId(medicationStatement.subject),
      status: medicationStatement.status,

      ...this.getCodeableConceptFields(
        medicationStatement.medicationCodeableConcept,
        'medication'
      ),
      effective: this.convertDateTime(medicationStatement.effectiveDateTime),
      reasonCode1: this.convertCodeableConcept(
        medicationStatement.reasonCode?.[0]
      ),
      reasonCode2: this.convertCodeableConcept(
        medicationStatement.reasonCode?.[1]
      ),
      reasonCode3: this.convertCodeableConcept(
        medicationStatement.reasonCode?.[2]
      ),
      note1: medicationStatement.note?.[0]?.text,
      note2: medicationStatement.note?.[1]?.text,
      note3: medicationStatement.note?.[2]?.text,
    };
  }
}
