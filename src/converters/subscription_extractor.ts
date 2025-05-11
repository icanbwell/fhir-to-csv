// `src/converters/subscription_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TSubscription } from '../types/resources/Subscription';

export class SubscriptionExtractor extends BaseResourceExtractor<TSubscription> {
  async extract(subscription: TSubscription): Promise<Record<string, ExtractorValueType>> {
    return {
      id: subscription.id,
      status: subscription.status,
      criteria: subscription.criteria,
      reason: subscription.reason,
      channelType: subscription.channel?.type,
      channelEndpoint: subscription.channel?.endpoint,
      channelPayload: subscription.channel?.payload,
      endpoint: subscription.channel?.endpoint,
      payload: subscription.channel?.payload,
      header1: subscription.channel?.header?.[0],
      header2: subscription.channel?.header?.[1],
      header3: subscription.channel?.header?.[2],
      end: this.convertDateTime(subscription.end),
    };
  }
}