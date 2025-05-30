 
 
// This file is auto-generated by generate_types so do not edit manually

import { TMeta } from '../partials/Meta';
import { TUri } from '../simpleTypes/Uri';
import { TNarrative } from '../partials/Narrative';
import { TResourceContainer } from '../simpleTypes/ResourceContainer';
import { TExtension } from '../partials/Extension';
import { TIdentifier } from '../partials/Identifier';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TReference } from '../partials/Reference';
import { TDateTime } from '../simpleTypes/DateTime';
import { TDate } from '../simpleTypes/Date';
import { TQuantity } from '../partials/Quantity';
import { TImmunizationPerformer } from '../partials/ImmunizationPerformer';
import { TAnnotation } from '../partials/Annotation';
import { TImmunizationEducation } from '../partials/ImmunizationEducation';
import { TImmunizationReaction } from '../partials/ImmunizationReaction';
import { TImmunizationProtocolApplied } from '../partials/ImmunizationProtocolApplied';

export type TImmunization = {
  resourceType?: string;
  id?: string;
  meta?: TMeta;
  implicitRules?: TUri;
  language?: string;
  text?: TNarrative;
  contained?: TResourceContainer[];
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  identifier?: TIdentifier[];
  status: string;
  statusReason?: TCodeableConcept;
  vaccineCode: TCodeableConcept;
  patient: TReference;
  encounter?: TReference;
  occurrenceDateTime?: TDateTime;
  occurrenceString?: string;
  recorded?: TDateTime;
  primarySource?: boolean;
  reportOrigin?: TCodeableConcept;
  location?: TReference;
  manufacturer?: TReference;
  lotNumber?: string;
  expirationDate?: TDate;
  site?: TCodeableConcept;
  route?: TCodeableConcept;
  doseQuantity?: TQuantity;
  performer?: TImmunizationPerformer[];
  note?: TAnnotation[];
  reasonCode?: TCodeableConcept[];
  reasonReference?: TReference[];
  isSubpotent?: boolean;
  subpotentReason?: TCodeableConcept[];
  education?: TImmunizationEducation[];
  programEligibility?: TCodeableConcept[];
  fundingSource?: TCodeableConcept;
  reaction?: TImmunizationReaction[];
  protocolApplied?: TImmunizationProtocolApplied[];
};
