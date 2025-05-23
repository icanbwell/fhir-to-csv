 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TReference } from '../partials/Reference';

export type TAdverseEventCausality = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  assessment?: TCodeableConcept;
  productRelatedness?: string;
  author?: TReference;
  method?: TCodeableConcept;
};
