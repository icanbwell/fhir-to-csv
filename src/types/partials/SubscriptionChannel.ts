 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TUrl } from '../simpleTypes/Url';

export type TSubscriptionChannel = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  type: string;
  endpoint?: TUrl;
  payload?: string;
  header?: string[];
};
