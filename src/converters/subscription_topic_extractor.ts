// `src/converters/subscription_topic_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSubscriptionTopic } from '../types/resources/SubscriptionTopic';

export class SubscriptionTopicExtractor extends BaseResourceExtractor<TSubscriptionTopic> {
  async extract(subscriptionTopic: TSubscriptionTopic): Promise<Record<string, ExtractorValueType>> {
    return {
      id: subscriptionTopic.id,
      url: subscriptionTopic.url,
      status: subscriptionTopic.status,
      description: subscriptionTopic.description,
      resourceTriggers: subscriptionTopic.resourceTrigger?.length,
      resourceTrigger1: subscriptionTopic.resourceTrigger?.[0]?.resource,
      resourceTrigger2: subscriptionTopic.resourceTrigger?.[1]?.resource,
      resourceTrigger3: subscriptionTopic.resourceTrigger?.[2]?.resource,
      resourceTrigger4: subscriptionTopic.resourceTrigger?.[3]?.resource,
      resourceTrigger5: subscriptionTopic.resourceTrigger?.[4]?.resource
    };
  }
}