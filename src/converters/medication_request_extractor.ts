import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedicationRequest } from '../types/resources/MedicationRequest';

export class MedicationRequestExtractor extends BaseResourceExtractor<TMedicationRequest> {
  async extract(
    medicationRequest: TMedicationRequest
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: medicationRequest.id,
      patientId: medicationRequest.subject?.reference?.split('/')?.pop(),
      status: medicationRequest.status,
      intent: medicationRequest.intent,
      category: medicationRequest.category?.[0]?.coding?.[0]?.display,
      medicationCode:
        medicationRequest.medicationCodeableConcept?.coding?.[0]?.code,
      medicationDisplay:
        medicationRequest.medicationCodeableConcept?.coding?.[0]?.display,
      authoredOn: medicationRequest.authoredOn?.toString(),
      reasonCode: medicationRequest.reasonCode?.[0]?.coding?.[0]?.display,
      requester: medicationRequest.requester?.reference,
      performer: medicationRequest.performer?.reference,
      dosageInstruction: {
        text: medicationRequest.dosageInstruction?.[0]?.text,
        route:
          medicationRequest.dosageInstruction?.[0]?.route?.coding?.[0]?.display,
        doseAndRate: {
          type: medicationRequest.dosageInstruction?.[0]?.doseAndRate?.[0]?.type
            ?.coding?.[0]?.display,
          doseQuantity:
            medicationRequest.dosageInstruction?.[0]?.doseAndRate?.[0]
              ?.doseQuantity?.value,
        },
      },
      dispenseRequest: {
        quantity: medicationRequest.dispenseRequest?.quantity?.value,
        expectedSupplyDuration:
          medicationRequest.dispenseRequest?.expectedSupplyDuration?.value,
      },
    };
  }
}
