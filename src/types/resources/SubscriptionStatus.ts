 
 
// This file is auto-generated by generate_types so do not edit manually

import { TMeta } from '../partials/Meta';
import { TUri } from '../simpleTypes/Uri';
import { TNarrative } from '../partials/Narrative';
import { TResourceContainer } from '../simpleTypes/ResourceContainer';
import { TExtension } from '../partials/Extension';
import { TSubscriptionStatusNotificationEvent } from '../partials/SubscriptionStatusNotificationEvent';
import { TReference } from '../partials/Reference';
import { TCanonical } from '../simpleTypes/Canonical';
import { TCodeableConcept } from '../partials/CodeableConcept';

export type TSubscriptionStatus = {
  resourceType?: string;
  id?: string;
  meta?: TMeta;
  implicitRules?: TUri;
  language?: string;
  text?: TNarrative;
  contained?: TResourceContainer[];
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  status?: string;
  type: string;
  eventsSinceSubscriptionStart?: string;
  notificationEvent?: TSubscriptionStatusNotificationEvent[];
  subscription: TReference;
  topic?: TCanonical;
  error?: TCodeableConcept[];
};
