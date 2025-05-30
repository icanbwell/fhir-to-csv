 
 
// This file is auto-generated by generate_types so do not edit manually

import { TMeta } from '../partials/Meta';
import { TUri } from '../simpleTypes/Uri';
import { TNarrative } from '../partials/Narrative';
import { TResourceContainer } from '../simpleTypes/ResourceContainer';
import { TExtension } from '../partials/Extension';
import { TIdentifier } from '../partials/Identifier';
import { TCanonical } from '../simpleTypes/Canonical';
import { TReference } from '../partials/Reference';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TQuantity } from '../partials/Quantity';
import { TRatio } from '../partials/Ratio';
import { TRange } from '../partials/Range';
import { TDateTime } from '../simpleTypes/DateTime';
import { TPeriod } from '../partials/Period';
import { TTiming } from '../partials/Timing';
import { TAnnotation } from '../partials/Annotation';

export type TServiceRequest = {
  resourceType?: string;
  id?: string;
  meta?: TMeta;
  implicitRules?: TUri;
  language?: string;
  text?: TNarrative;
  contained?: TResourceContainer[];
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  identifier?: TIdentifier[];
  instantiatesCanonical?: TCanonical[];
  instantiatesUri?: TUri[];
  basedOn?: TReference[];
  replaces?: TReference[];
  requisition?: TIdentifier;
  status: string;
  intent: string;
  category?: TCodeableConcept[];
  priority?: string;
  doNotPerform?: boolean;
  code?: TCodeableConcept;
  orderDetail?: TCodeableConcept[];
  quantityQuantity?: TQuantity;
  quantityRatio?: TRatio;
  quantityRange?: TRange;
  subject: TReference;
  encounter?: TReference;
  occurrenceDateTime?: TDateTime;
  occurrencePeriod?: TPeriod;
  occurrenceTiming?: TTiming;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: TCodeableConcept;
  authoredOn?: TDateTime;
  requester?: TReference;
  performerType?: TCodeableConcept;
  performer?: TReference[];
  locationCode?: TCodeableConcept[];
  locationReference?: TReference[];
  reasonCode?: TCodeableConcept[];
  reasonReference?: TReference[];
  insurance?: TReference[];
  supportingInfo?: TReference[];
  specimen?: TReference[];
  bodySite?: TCodeableConcept[];
  note?: TAnnotation[];
  patientInstruction?: string;
  relevantHistory?: TReference[];
};
