 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TMoney } from '../partials/Money';

export type TExplanationOfBenefitTotal = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  category: TCodeableConcept;
  amount: TMoney;
};
