 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TInt } from '../simpleTypes/Int';
import { TReference } from '../partials/Reference';

export type TClaimResponseInsurance = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  sequence: TInt;
  focal: boolean;
  coverage: TReference;
  businessArrangement?: string;
  claimResponse?: TReference;
};
