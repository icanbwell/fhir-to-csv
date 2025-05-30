 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TMarkdown } from '../simpleTypes/Markdown';

export type THealthcareServiceEligibility = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  code?: TCodeableConcept;
  comment?: TMarkdown;
};
