// `src/converters/subscription_status_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSubscriptionStatus } from '../types/resources/SubscriptionStatus';

export class SubscriptionStatusExtractor extends BaseResourceExtractor<TSubscriptionStatus> {
  async extract(subscriptionStatus: TSubscriptionStatus): Promise<Record<string, ExtractorValueType>> {
    return {
      id: subscriptionStatus.id,
      status: subscriptionStatus.status,
      type: subscriptionStatus.type,
      topic: subscriptionStatus.topic,
      subscription: this.convertReference(subscriptionStatus.subscription),
      notificationEvent1: subscriptionStatus.notificationEvent?.[0]?.id,
      notificationEvent1TimeStamp: this.convertDateTime(subscriptionStatus.notificationEvent?.[0]?.timestamp),
      notificationEvent2: subscriptionStatus.notificationEvent?.[1]?.id,
      notificationEvent2TimeStamp: this.convertDateTime(subscriptionStatus.notificationEvent?.[1]?.timestamp),
      notificationEvent3: subscriptionStatus.notificationEvent?.[2]?.id,
      notificationEvent3TimeStamp: this.convertDateTime(subscriptionStatus.notificationEvent?.[2]?.timestamp),
      notificationEvent4: subscriptionStatus.notificationEvent?.[3]?.id,
      notificationEvent4TimeStamp: this.convertDateTime(subscriptionStatus.notificationEvent?.[3]?.timestamp),
      notificationEvent5: subscriptionStatus.notificationEvent?.[4]?.id,
      notificationEvent5TimeStamp: this.convertDateTime(subscriptionStatus.notificationEvent?.[4]?.timestamp),

      ...this.getCodeableConceptFields(
        subscriptionStatus.error?.[0],
        'error1'
      ),
      error2: this.convertCodeableConcept(
        subscriptionStatus.error?.[1]
      ),
      error3: this.convertCodeableConcept(
        subscriptionStatus.error?.[2]
      ),
    };
  }
}