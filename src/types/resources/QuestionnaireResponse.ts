 
 
// This file is auto-generated by generate_types so do not edit manually

import { TMeta } from '../partials/Meta';
import { TUri } from '../simpleTypes/Uri';
import { TNarrative } from '../partials/Narrative';
import { TResourceContainer } from '../simpleTypes/ResourceContainer';
import { TExtension } from '../partials/Extension';
import { TIdentifier } from '../partials/Identifier';
import { TReference } from '../partials/Reference';
import { TCanonical } from '../simpleTypes/Canonical';
import { TDateTime } from '../simpleTypes/DateTime';
import { TQuestionnaireResponseItem } from '../partials/QuestionnaireResponseItem';

export type TQuestionnaireResponse = {
  resourceType?: string;
  id?: string;
  meta?: TMeta;
  implicitRules?: TUri;
  language?: string;
  text?: TNarrative;
  contained?: TResourceContainer[];
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  identifier?: TIdentifier;
  basedOn?: TReference[];
  partOf?: TReference[];
  questionnaire?: TCanonical;
  status: string;
  subject?: TReference;
  encounter?: TReference;
  authored?: TDateTime;
  author?: TReference;
  source?: TReference;
  item?: TQuestionnaireResponseItem[];
};
