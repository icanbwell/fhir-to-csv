import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedicationRequest } from '../types/resources/MedicationRequest';

export class MedicationRequestExtractor extends BaseResourceExtractor<TMedicationRequest> {
  extract(
    medicationRequest: TMedicationRequest
  ): Record<string, ExtractorValueType> {
    return {
      id: medicationRequest.id,
      patientId: this.getReferenceId(medicationRequest.subject),
      status: medicationRequest.status,
      intent: medicationRequest.intent,
      ...this.getCodeableConceptFields(
        medicationRequest.medicationCodeableConcept,
        'medication'
      ),
      dosageInstruction1: this.convertCodeableConcept(
        medicationRequest.dosageInstruction?.[0]
      ),
      dosageInstruction2: this.convertCodeableConcept(
        medicationRequest.dosageInstruction?.[1]
      ),
      dosageInstruction3: this.convertCodeableConcept(
        medicationRequest.dosageInstruction?.[2]
      ),
      authoredOn: this.convertDateTime(medicationRequest.authoredOn),
      requester: this.convertReference(medicationRequest.requester),
      reasonCode1: this.convertCodeableConcept(
        medicationRequest.reasonCode?.[0]
      ),
      reasonCode2: this.convertCodeableConcept(
        medicationRequest.reasonCode?.[1]
      ),
      reasonCode3: this.convertCodeableConcept(
        medicationRequest.reasonCode?.[2]
      ),
      reasonReference1: this.convertReference(
        medicationRequest.reasonReference?.[0]
      ),
      reasonReference2: this.convertReference(
        medicationRequest.reasonReference?.[1]
      ),
      reasonReference3: this.convertReference(
        medicationRequest.reasonReference?.[2]
      ),
    };
  }
}
