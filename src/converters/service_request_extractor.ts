import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TServiceRequest } from '../types/resources/ServiceRequest';

export class ServiceRequestExtractor extends BaseResourceExtractor<TServiceRequest> {
  extract(
    serviceRequest: TServiceRequest
  ): Record<string, ExtractorValueType> {
    return {
      id: serviceRequest.id,
      status: serviceRequest.status,
      intent: serviceRequest.intent,
      ...this.getCodeableConceptFields(
        serviceRequest.category?.[0],
        'category1'
      ),
      category2: this.convertCodeableConcept(
        serviceRequest.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        serviceRequest.category?.[2]
      ),
      ...this.getCodeableConceptFields(
        serviceRequest.code,
        'code'
      ),
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
