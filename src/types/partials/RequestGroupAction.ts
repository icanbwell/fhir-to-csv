 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TRelatedArtifact } from '../partials/RelatedArtifact';
import { TRequestGroupCondition } from '../partials/RequestGroupCondition';
import { TRequestGroupRelatedAction } from '../partials/RequestGroupRelatedAction';
import { TDateTime } from '../simpleTypes/DateTime';
import { TQuantity } from '../partials/Quantity';
import { TPeriod } from '../partials/Period';
import { TRange } from '../partials/Range';
import { TTiming } from '../partials/Timing';
import { TReference } from '../partials/Reference';

export type TRequestGroupAction = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  prefix?: string;
  title?: string;
  description?: string;
  textEquivalent?: string;
  priority?: string;
  code?: TCodeableConcept[];
  documentation?: TRelatedArtifact[];
  condition?: TRequestGroupCondition[];
  relatedAction?: TRequestGroupRelatedAction[];
  timingDateTime?: TDateTime;
  timingAge?: TQuantity;
  timingPeriod?: TPeriod;
  timingDuration?: TQuantity;
  timingRange?: TRange;
  timingTiming?: TTiming;
  participant?: TReference[];
  type?: TCodeableConcept;
  groupingBehavior?: string;
  selectionBehavior?: string;
  requiredBehavior?: string;
  precheckBehavior?: string;
  cardinalityBehavior?: string;
  resource?: TReference;
  action?: TRequestGroupAction[];
};
