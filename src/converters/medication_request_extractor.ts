import { BaseResourceExtractor } from './base_extractor';
import { TMedicationRequest } from '../types/resources/MedicationRequest';

export class MedicationRequestExtractor extends BaseResourceExtractor<TMedicationRequest> {
  async extract(
    medicationRequest: TMedicationRequest
  ): Promise<Record<string, any>> {
    return {
      id: medicationRequest.id,
      patientId: medicationRequest.subject?.reference?.split('/')?.pop(),
      status: medicationRequest.status,
      intent: medicationRequest.intent,
      medicationCode:
        medicationRequest.medicationCodeableConcept?.coding?.[0]?.code,
      medicationDisplay:
        medicationRequest.medicationCodeableConcept?.coding?.[0]?.display,
      authoredOn: medicationRequest.authoredOn?.toString(),
      dosageInstruction: medicationRequest.dosageInstruction?.[0]?.text,
      reasonCode: medicationRequest.reasonCode?.[0]?.coding?.[0]?.display,
    };
  }
}
