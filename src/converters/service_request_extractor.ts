import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TServiceRequest } from '../types/resources/ServiceRequest';

export class ServiceRequestExtractor extends BaseResourceExtractor<TServiceRequest> {
  async extract(
    serviceRequest: TServiceRequest
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: serviceRequest.id,
      status: serviceRequest.status,
      intent: serviceRequest.intent,
      code: this.convertCodeableConcept(serviceRequest.code),
      subjectId: this.getReferenceId(serviceRequest.subject),
      requesterId: this.getReferenceId(serviceRequest.requester),
      performer1: this.convertReference(serviceRequest.performer?.[0]),
      performer2: this.convertReference(serviceRequest.performer?.[1]),
      performer3: this.convertReference(serviceRequest.performer?.[2]),
      reasonCode1: this.convertCodeableConcept(
        serviceRequest.reasonCode?.[0]
      ),
      reasonCode2: this.convertCodeableConcept(
        serviceRequest.reasonCode?.[1]
      ),
      reasonCode3: this.convertCodeableConcept(
        serviceRequest.reasonCode?.[2]
      ),
      occurrence: this.convertDateTime(serviceRequest.occurrenceDateTime),
      priority: serviceRequest.priority,
    };
  }
}
