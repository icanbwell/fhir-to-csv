 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TId } from '../simpleTypes/Id';

export type TTestScriptAssert = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  label?: string;
  description?: string;
  direction?: string;
  compareToSourceId?: string;
  compareToSourceExpression?: string;
  compareToSourcePath?: string;
  contentType?: string;
  expression?: string;
  headerField?: string;
  minimumId?: string;
  navigationLinks?: boolean;
  operator?: string;
  path?: string;
  requestMethod?: string;
  requestURL?: string;
  resource?: string;
  response?: string;
  responseCode?: string;
  sourceId?: TId;
  validateProfileId?: TId;
  value?: string;
  warningOnly: boolean;
};
