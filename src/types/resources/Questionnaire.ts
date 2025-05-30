 
 
// This file is auto-generated by generate_types so do not edit manually

import { TMeta } from '../partials/Meta';
import { TUri } from '../simpleTypes/Uri';
import { TNarrative } from '../partials/Narrative';
import { TResourceContainer } from '../simpleTypes/ResourceContainer';
import { TExtension } from '../partials/Extension';
import { TIdentifier } from '../partials/Identifier';
import { TCanonical } from '../simpleTypes/Canonical';
import { TDateTime } from '../simpleTypes/DateTime';
import { TContactDetail } from '../partials/ContactDetail';
import { TMarkdown } from '../simpleTypes/Markdown';
import { TUsageContext } from '../partials/UsageContext';
import { TCodeableConcept } from '../partials/CodeableConcept';
import { TDate } from '../simpleTypes/Date';
import { TPeriod } from '../partials/Period';
import { TCoding } from '../partials/Coding';
import { TQuestionnaireItem } from '../partials/QuestionnaireItem';

export type TQuestionnaire = {
  resourceType?: string;
  id?: string;
  meta?: TMeta;
  implicitRules?: TUri;
  language?: string;
  text?: TNarrative;
  contained?: TResourceContainer[];
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  url?: TUri;
  identifier?: TIdentifier[];
  version?: string;
  name?: string;
  title?: string;
  derivedFrom?: TCanonical[];
  status: string;
  experimental?: boolean;
  subjectType?: string[];
  date?: TDateTime;
  publisher?: string;
  contact?: TContactDetail[];
  description?: TMarkdown;
  useContext?: TUsageContext[];
  jurisdiction?: TCodeableConcept[];
  purpose?: TMarkdown;
  copyright?: TMarkdown;
  approvalDate?: TDate;
  lastReviewDate?: TDate;
  effectivePeriod?: TPeriod;
  code?: TCoding[];
  item?: TQuestionnaireItem[];
};
