 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TReference } from '../partials/Reference';

export type TConsentData = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  meaning: string;
  reference: TReference;
};
