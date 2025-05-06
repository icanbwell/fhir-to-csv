import { BaseResourceExtractor } from './base_extractor';
import { TServiceRequest } from '../types/resources/ServiceRequest';

export class ServiceRequestExtractor extends BaseResourceExtractor<TServiceRequest> {
  async extract(serviceRequest: TServiceRequest): Promise<Record<string, any>> {
    return {
      id: serviceRequest.id,
      patientId: serviceRequest.subject?.reference?.split('/')?.pop(),
      status: serviceRequest.status,
      intent: serviceRequest.intent,
      category: serviceRequest.category?.[0]?.coding?.[0]?.code,
      code: serviceRequest.code?.coding?.[0]?.code,
      codeDisplay: serviceRequest.code?.coding?.[0]?.display,
      occurrenceDatetime: serviceRequest.occurrenceDateTime?.toString(),
      occurrencePeriodStart: serviceRequest.occurrencePeriod?.start?.toString(),
      occurrencePeriodEnd: serviceRequest.occurrencePeriod?.end?.toString(),
      performerIds: serviceRequest.performer?.map(p =>
        p.reference?.split('/')?.pop()
      ),
    };
  }
}
