 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TCanonical } from '../simpleTypes/Canonical';
import { TMarkdown } from '../simpleTypes/Markdown';
import { TCapabilityStatementInteraction } from '../partials/CapabilityStatementInteraction';
import { TCapabilityStatementSearchParam } from '../partials/CapabilityStatementSearchParam';
import { TCapabilityStatementOperation } from '../partials/CapabilityStatementOperation';

export type TCapabilityStatementResource = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  type: string;
  profile?: TCanonical;
  supportedProfile?: TCanonical[];
  documentation?: TMarkdown;
  interaction?: TCapabilityStatementInteraction[];
  versioning?: string;
  readHistory?: boolean;
  updateCreate?: boolean;
  conditionalCreate?: boolean;
  conditionalRead?: string;
  conditionalUpdate?: boolean;
  conditionalDelete?: string;
  referencePolicy?: string[];
  searchInclude?: string[];
  searchRevInclude?: string[];
  searchParam?: TCapabilityStatementSearchParam[];
  operation?: TCapabilityStatementOperation[];
};
