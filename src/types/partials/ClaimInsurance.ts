 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TInt } from '../simpleTypes/Int';
import { TIdentifier } from '../partials/Identifier';
import { TReference } from '../partials/Reference';

export type TClaimInsurance = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  sequence: TInt;
  focal: boolean;
  identifier?: TIdentifier;
  coverage: TReference;
  businessArrangement?: string;
  preAuthRef?: string[];
  claimResponse?: TReference;
};
