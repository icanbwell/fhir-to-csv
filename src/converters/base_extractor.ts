import { TCoding } from '../types/partials/Coding';
import { TReference } from '../types/partials/Reference';
import { TCodeableConcept } from '../types/partials/CodeableConcept';
import { TPeriod } from '../types/partials/Period';

export type ExtractorValueType = string | number | Date | undefined | boolean;

export abstract class BaseResourceExtractor<T> {
  abstract extract(resource: T): Promise<Record<string, ExtractorValueType>>;

  convertCoding(coding: TCoding | undefined): ExtractorValueType {
    return coding ? `${coding.code} ${coding.system} (${coding.display})`: coding;
  }

  convertCodings(codings: TCoding[] | undefined): ExtractorValueType {
    return codings
      ? codings.map(coding => `${coding.code} ${coding.system} (${coding.display})`).join(', ')
      : codings;
  }

  convertCodeableConcept(
    codeableConcept: TCodeableConcept | undefined
  ): ExtractorValueType {
    return codeableConcept ?
      `${codeableConcept.coding?.[0]?.code} ${codeableConcept.coding?.[0]?.system} (${codeableConcept.coding?.[0]?.display})` :
      codeableConcept;
  }

  convertCodeableConcepts(
    codeableConcepts: TCodeableConcept[] | undefined
  ): ExtractorValueType {
    return codeableConcepts
      ? codeableConcepts.map(cc => `${cc.coding?.[0]?.code} ${cc.coding?.[0]?.system} (${cc.coding?.[0]?.display})`).join(', ')
      : codeableConcepts;
  }

  convertReference(reference: TReference | undefined): ExtractorValueType {
    return reference ? `${reference.reference} (${reference.type})` : reference;
  }

  getReferenceId(reference: TReference | undefined): ExtractorValueType {
    return reference ? reference.reference?.split('/')?.pop() : reference;
  }

  convertDateTime(dateTime: Date | string | undefined): ExtractorValueType {
    return dateTime ? dateTime.toString() : dateTime;
  }

  convertPeriod(
    period: TPeriod | undefined
  ): ExtractorValueType {
    return period
      ? `${period.start?.toString()} - ${period.end?.toString()}`
      : period;
  }
}

// Utility type for extractors
export type Extractor<T> = new () => BaseResourceExtractor<T>;
