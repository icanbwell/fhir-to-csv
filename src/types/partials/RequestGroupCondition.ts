 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TExpression } from '../partials/Expression';

export type TRequestGroupCondition = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  kind: string;
  expression?: TExpression;
};
