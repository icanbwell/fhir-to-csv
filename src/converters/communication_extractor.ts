// `src/converters/communication_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCommunication } from '../types/resources/Communication';

export class CommunicationExtractor extends BaseResourceExtractor<TCommunication> {
  async extract(communication: TCommunication): Promise<Record<string, ExtractorValueType>> {
    return {
      id: communication.id,
      status: communication.status,
      ...this.getCodeableConceptFields(
        communication.category?.[0],
        'category1'
      ),
      category2: this.convertCodeableConcept(communication.category?.[1]),
      category3: this.convertCodeableConcept(communication.category?.[2]),
      priority: communication.priority,
      medium1: this.convertCodeableConcept(communication.medium?.[0]),
      medium2: this.convertCodeableConcept(communication.medium?.[1]),
      medium3: this.convertCodeableConcept(communication.medium?.[2]),
      subject: this.convertReference(communication.subject),
      topic: this.convertCodeableConcept(communication.topic),
      about1: this.convertReference(communication.about?.[0]),
      about2: this.convertReference(communication.about?.[1]),
      about3: this.convertReference(communication.about?.[2]),
      encounter: this.convertReference(communication.encounter),
      sent: this.convertDateTime(communication.sent),
      received: this.convertDateTime(communication.received),
      sender: this.convertReference(communication.sender),
      recipient1: this.convertReference(communication.recipient?.[0]),
      recipient2: this.convertReference(communication.recipient?.[1]),
      recipient3: this.convertReference(communication.recipient?.[2]),
      payloadContentString1: communication.payload?.[0]?.contentString,
      payloadContentString2: communication.payload?.[1]?.contentString,
      payloadContentString3: communication.payload?.[2]?.contentString,
    };
  }
}