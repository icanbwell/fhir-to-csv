 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TUri } from '../simpleTypes/Uri';
import { TValueSetDesignation } from '../partials/ValueSetDesignation';

export type TValueSetContains = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  system?: TUri;
  abstract?: boolean;
  inactive?: boolean;
  version?: string;
  code?: string;
  display?: string;
  designation?: TValueSetDesignation[];
  contains?: TValueSetContains[];
};
