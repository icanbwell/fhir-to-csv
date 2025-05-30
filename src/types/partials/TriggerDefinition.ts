 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TTiming } from '../partials/Timing';
import { TReference } from '../partials/Reference';
import { TDate } from '../simpleTypes/Date';
import { TDateTime } from '../simpleTypes/DateTime';
import { TDataRequirement } from '../partials/DataRequirement';
import { TExpression } from '../partials/Expression';

export type TTriggerDefinition = {
  id?: string;
  extension?: TExtension[];
  type: string;
  name?: string;
  timingTiming?: TTiming;
  timingReference?: TReference;
  timingDate?: TDate;
  timingDateTime?: TDateTime;
  data?: TDataRequirement[];
  condition?: TExpression;
};
