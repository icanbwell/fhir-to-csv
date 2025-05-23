 
 
// This file is auto-generated by generate_types so do not edit manually

import { TExtension } from '../partials/Extension';
import { TBase64Binary } from '../simpleTypes/Base64Binary';
import { TUrl } from '../simpleTypes/Url';
import { TUnsignedInt } from '../simpleTypes/UnsignedInt';
import { TDateTime } from '../simpleTypes/DateTime';

export type TAttachment = {
  id?: string;
  extension?: TExtension[];
  contentType?: string;
  language?: string;
  data?: TBase64Binary;
  url?: TUrl;
  size?: TUnsignedInt;
  hash?: TBase64Binary;
  title?: string;
  creation?: TDateTime;
};
