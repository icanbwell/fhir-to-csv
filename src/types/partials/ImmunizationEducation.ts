 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TUri } from '../simpleTypes/Uri';
import { TDateTime } from '../simpleTypes/DateTime';

export type TImmunizationEducation = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  documentType?: string;
  reference?: TUri;
  publicationDate?: TDateTime;
  presentationDate?: TDateTime;
};
