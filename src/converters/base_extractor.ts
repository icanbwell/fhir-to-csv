import { TCoding } from '../types/partials/Coding';
import { TReference } from '../types/partials/Reference';
import { TCodeableConcept } from '../types/partials/CodeableConcept';
import { TQuantity } from '../types/partials/Quantity';
import { TAddress } from '../types/partials/Address';
import { TRatio } from '../types/partials/Ratio';
import { TIdentifier } from '../types/partials/Identifier';
import { THumanName } from '../types/partials/HumanName';
import { TContactPoint } from '../types/partials/ContactPoint';
import { TDosageDoseAndRate } from '../types/partials/DosageDoseAndRate';
import { TExtension } from '../types/partials/Extension';
import systemMap1 from './system_map.json';
const systemMap: Record<string, string> = systemMap1;

export type ExtractorValueType = string | number | Date | undefined | boolean;

export abstract class BaseResourceExtractor<T> {
  abstract extract(resource: T): Promise<Record<string, ExtractorValueType>>;

  convertCoding(coding: TCoding | undefined): ExtractorValueType {
    if (!coding) return coding;
    // if there is a display name but no code, return the display name
    if (coding.display && !coding.code) {
      return coding.display;
    }
    if (coding.system && coding.code && coding.display) {
      return `${this.getFriendlyNameForSystem(coding.system)}=${coding.code} (${coding.display})`;
    }
    if (coding.system && coding.code) {
      return `${this.getFriendlyNameForSystem(coding.system)}=${coding.code}`;
    }
    if (coding.system && coding.display) {
      return `${this.getFriendlyNameForSystem(coding.system)}=${coding.display}`;
    }
    if (coding.code && coding.display) {
      return `${coding.code} (${coding.display})`;
    }
    if (coding.code) {
      return coding.code;
    }
    if (coding.display) {
      return coding.display;
    }
    if (coding.system) {
      return this.getFriendlyNameForSystem(coding.system);
    }
    return undefined;
  }

  getFriendlyNameForSystem(system: string | undefined): string | undefined {
    if (!system) return system;
    if (system.startsWith('https://www.icanbwell.com/')) {
      return system.replace('https://www.icanbwell.com/', '');
    }
    if (system.startsWith('http://www.icanbwell.com/')) {
      return system.replace('http://www.icanbwell.com/', '');
    }
    return systemMap[system] || system;
  }

  convertCodeableConcept(
    codeableConcept: TCodeableConcept | undefined
  ): ExtractorValueType {
    if (!codeableConcept) return codeableConcept;
    if (codeableConcept.text) {
      return codeableConcept.text;
    }
    // combine all codings into a single string
    if (codeableConcept.coding) {
      return codeableConcept.coding
        .map(coding => this.convertCoding(coding))
        .join('|');
    }
    return undefined;
  }

  convertReference(reference: TReference | undefined): ExtractorValueType {
    return reference ? `${reference.reference}` : reference;
  }

  getReferenceId(reference: TReference | undefined): ExtractorValueType {
    return reference ? reference.reference?.split('/')?.pop() : reference;
  }

  convertDateTime(dateTime: Date | string | undefined): ExtractorValueType {
    return dateTime ? dateTime.toString() : dateTime;
  }

  convertQuantity(quantity: TQuantity | undefined): ExtractorValueType {
    if (!quantity) return quantity;
    // if there is a display name but no code, return the display name
    if (quantity.value && !quantity.unit) {
      return quantity.value;
    }
    if (quantity.value && quantity.unit && quantity.system) {
      return `${quantity.value} ${quantity.unit} (${this.getFriendlyNameForSystem(quantity.system)})`;
    }
    if (quantity.value && quantity.unit) {
      return `${quantity.value} ${quantity.unit}`;
    }
    if (quantity.system) {
      return `${this.getFriendlyNameForSystem(quantity.system)}`;
    }
    if (quantity.unit) {
      return `${quantity.unit}`;
    }
    if (quantity.value) {
      return `${quantity.value}`;
    }
    return undefined;
  }

  convertAddress(address: TAddress | undefined): ExtractorValueType {
    if (!address) return address;
    return address.country
      ? `${address.line?.join(', ')}, ${address.city ?? ''}, ${address.state ?? ''} ${address.postalCode ?? ''} (${address.country ?? ''})`
      : `${address.line?.join(', ')}, ${address.city ?? ''}, ${address.state ?? ''} ${address.postalCode ?? ''}`;
  }

  convertRatio(ration: TRatio | undefined): ExtractorValueType {
    return ration
      ? `${ration.numerator?.value ?? '[No value]'} ${ration.numerator?.unit ?? '[No unit]'}`
      +` / ${ration.denominator?.value ?? '[No value]'} ${ration.denominator?.unit ?? '[No unit]'}`
      : ration;
  }

  convertIdentifier(identifier: TIdentifier | undefined): ExtractorValueType {
    return identifier
      ? `${identifier.id || this.getFriendlyNameForSystem(identifier.system)}=${identifier.value}`
      : identifier;
  }

  convertHumanName(humanName: THumanName | undefined): ExtractorValueType {
    if (!humanName) return humanName;
    if (humanName.text) {
      return humanName.text;
    }
    return humanName.use
      ? `${humanName.given?.join(' ')} ${humanName.family} (${humanName.use})`
      : `${humanName.given?.join(' ')} ${humanName.family}`;
  }

  getEmail(
    contactPoints: TContactPoint[] | undefined,
    index: number
  ): ExtractorValueType {
    if (!contactPoints) return undefined;
    const emails = contactPoints.filter(
      contactPoint => contactPoint.system === 'email'
    );
    const email = emails[index];
    if (!email) return undefined;
    return email.value;
  }

  getPhone(
    contactPoints: TContactPoint[] | undefined,
    index: number
  ): ExtractorValueType {
    if (!contactPoints) return undefined;
    const emails = contactPoints.filter(
      contactPoint => contactPoint.system === 'phone'
    );
    const email = emails[index];
    if (!email) return undefined;
    return email.value;
  }

  convertDosageAndRate(
    dosage: TDosageDoseAndRate | undefined
  ): ExtractorValueType {
    return dosage
      ? `${dosage.doseQuantity?.value ?? '[No value]'} ${dosage.doseQuantity?.unit ?? '[No unit]'}`
      +` (${dosage.rateRatio?.numerator?.value ?? '[No value]'} ${dosage.rateRatio?.numerator?.unit ?? '[No unit]'}`
      +` / ${dosage.rateRatio?.denominator?.value ?? 'No value]'} ${dosage.rateRatio?.denominator?.unit ?? '[No unit]'})`
      : dosage;
  }

  convertExtension(extension: TExtension | undefined): ExtractorValueType {
    if (!extension) return extension;
    const url = this.getFriendlyNameForSystem(extension.url);
    if (extension.valueCoding) {
      return this.convertCoding(extension.valueCoding);
    }
    if (extension.valueCodeableConcept) {
      return this.convertCodeableConcept(extension.valueCodeableConcept);
    }
    if (extension.valueReference) {
      return this.convertReference(extension.valueReference);
    }
    return url
      ? `${url}=${extension.valueString || extension.valueBoolean || extension.valueCode || extension.valueInteger || extension.valueDecimal || extension.valueUri || extension.valueBase64Binary}`
      : `${extension.valueString || extension.valueBoolean || extension.valueCode || extension.valueInteger || extension.valueDecimal || extension.valueUri || extension.valueBase64Binary}`;
  }

  getExtensionValueByUrl(
    extensions: TExtension[] | undefined,
    url: string
  ): ExtractorValueType {
    if (!extensions) return undefined;
    const extension = extensions.find(ext => ext.url === url);
    if (!extension) return undefined;
    // if there is a nested extension, return the value of the first one
    if (extension.extension) {
      return extension.extension
        .map(ext => this.convertExtension(ext))
        .join('|');
    }
    return `${extension.valueString || extension.valueBoolean || extension.valueCode || extension.valueInteger || extension.valueDecimal || extension.valueUri || extension.valueBase64Binary}`;
  }
}

// Utility type for extractors
export type Extractor<T> = new () => BaseResourceExtractor<T>;
