 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TInt } from '../simpleTypes/Int';
import { TCoding } from '../partials/Coding';

export type TTestScriptDestination = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  index: TInt;
  profile: TCoding;
};
