 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TTime } from '../simpleTypes/Time';

export type TPractitionerRoleAvailableTime = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  daysOfWeek?: string[];
  allDay?: boolean;
  availableStartTime?: TTime;
  availableEndTime?: TTime;
};
