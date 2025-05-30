 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TRatio } from '../partials/Ratio';
import { TRatioRange } from '../partials/RatioRange';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TIngredientReferenceStrength } from '../partials/IngredientReferenceStrength';

export type TIngredientStrength = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  presentationRatio?: TRatio;
  presentationRatioRange?: TRatioRange;
  textPresentation?: string;
  concentrationRatio?: TRatio;
  concentrationRatioRange?: TRatioRange;
  textConcentration?: string;
  measurementPoint?: string;
  country?: TCodeableConcept[];
  referenceStrength?: TIngredientReferenceStrength[];
};
