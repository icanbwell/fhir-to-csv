 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TTestReportAction1 } from '../partials/TestReportAction1';

export type TTestReportTest = {
  id?: string;
  extension?: TExtension[];
  modifierExtension?: TExtension[];
  name?: string;
  description?: string;
  action: TTestReportAction1[];
};
