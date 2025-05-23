 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TInt } from '../simpleTypes/Int';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TTiming } from '../partials/Timing';
import { TDosageDoseAndRate } from '../partials/DosageDoseAndRate';
import { TRatio } from '../partials/Ratio';
import { TQuantity } from '../partials/Quantity';

export type TDosage = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  sequence?: TInt;
  text?: string;
  additionalInstruction?: TCodeableConcept[];
  patientInstruction?: string;
  timing?: TTiming;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: TCodeableConcept;
  site?: TCodeableConcept;
  route?: TCodeableConcept;
  method?: TCodeableConcept;
  doseAndRate?: TDosageDoseAndRate[];
  maxDosePerPeriod?: TRatio;
  maxDosePerAdministration?: TQuantity;
  maxDosePerLifetime?: TQuantity;
};
