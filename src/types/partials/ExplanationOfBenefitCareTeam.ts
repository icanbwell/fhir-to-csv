 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TInt } from '../simpleTypes/Int';
import { TReference } from '../partials/Reference';
import { TCodeableConcept } from '../partials/CodeableConcept';

export type TExplanationOfBenefitCareTeam = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  sequence: TInt;
  provider: TReference;
  responsible?: boolean;
  role?: TCodeableConcept;
  qualification?: TCodeableConcept;
};
