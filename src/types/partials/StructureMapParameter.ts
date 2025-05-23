 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TId } from '../simpleTypes/Id';
import { TInt } from '../simpleTypes/Int';
import { TDecimal } from '../simpleTypes/Decimal';

export type TStructureMapParameter = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  valueId?: TId;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: TInt;
  valueDecimal?: TDecimal;
};
