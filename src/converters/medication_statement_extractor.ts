import { BaseResourceExtractor } from './base_extractor';
import { TMedicationStatement } from '../types/resources/MedicationStatement';

export class MedicationStatementExtractor extends BaseResourceExtractor<TMedicationStatement> {
  extract(medicationStatement: TMedicationStatement): Record<string, any> {
    return {
      id: medicationStatement.id,
      patientId: medicationStatement.subject?.reference?.split('/')?.pop(),
      status: medicationStatement.status,
      medicationCode:
        medicationStatement.medicationCodeableConcept?.coding?.[0]?.code,
      medicationDisplay:
        medicationStatement.medicationCodeableConcept?.coding?.[0]?.display,
      effectiveDatetime: medicationStatement.effectiveDateTime?.toString(),
      effectivePeriodStart:
        medicationStatement.effectivePeriod?.start?.toString(),
      effectivePeriodEnd: medicationStatement.effectivePeriod?.end?.toString(),
      // taken: medicationStatement.,
      reasonCode: medicationStatement.reasonCode?.[0]?.coding?.[0]?.code,
    };
  }
}
