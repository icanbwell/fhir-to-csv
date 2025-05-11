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

  isPreferredCoding(coding: TCoding | undefined): boolean {
    if (!coding || !coding.extension) return false;
    const extension = this.getExtensionByUrl(
      coding.extension,
      'https://fhir.icanbwell.com/4_0_0/StructureDefinition/intelligence'
    );
    if (extension) {
      return extension.valueCode === 'preferred';
    }
    return false;
  }

  convertCoding(coding: TCoding | undefined): ExtractorValueType {
    if (!coding) return coding;
    // if there is a display name but no code, return the display name
    if (coding.display && !coding.code) {
      return coding.display;
    }
    if (coding.system) {
      const systemName = this.getFriendlyNameForSystem(coding.system);
      if (coding.code && coding.display) {
        return `${systemName}=${coding.code} (${coding.display})`;
      }
      if (coding.code) {
        return `${systemName}=${coding.code}`;
      }
      if (coding.display) {
        return `${systemName}=${coding.display}`;
      }
      return systemName;
    }
    if (coding.code && coding.display) {
      return `${coding.code} (${coding.display})`;
    }
    return coding.code || coding.display || undefined;
  }

  getCodingFields(
    coding: TCoding | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!coding) return {};
    return {
      [`${prefix}System`]: this.getFriendlyNameForSystem(coding.system),
      [`${prefix}Code`]: coding.code,
      [`${prefix}Display`]: coding.display,
      [`${prefix}Preferred`]: this.isPreferredCoding(coding),
    };
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

  getCodeableConceptFields(
    codeableConcept: TCodeableConcept | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!codeableConcept) return {};
    return {
      [`${prefix}`]: this.convertCodeableConcept(codeableConcept),
      [`${prefix}Text`]: codeableConcept.text,
      ...this.getCodingFields(codeableConcept.coding?.[0], `${prefix}Coding1`),
      ...this.getCodingFields(codeableConcept.coding?.[1], `${prefix}Coding2`),
      ...this.getCodingFields(codeableConcept.coding?.[2], `${prefix}Coding3`),
    };
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

  getQuantityFields(
    quantity: TQuantity | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!quantity) return {};
    return {
      [`${prefix}Value`]: quantity.value,
      [`${prefix}Unit`]: quantity.unit,
      [`${prefix}System`]: quantity.system,
      [`${prefix}Code`]: quantity.code,
    };
  }

  convertAddress(address: TAddress | undefined): ExtractorValueType {
    if (!address) return address;
    return address.country
      ? `${address.line?.join(', ')}, ${address.city ?? ''}, ${address.state ?? ''} ${address.postalCode ?? ''} (${address.country ?? ''})`
      : `${address.line?.join(', ')}, ${address.city ?? ''}, ${address.state ?? ''} ${address.postalCode ?? ''}`;
  }

  getAddressFields(
    address: TAddress | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!address) return {};
    return {
      [`${prefix}Line`]: address.line?.join(', '),
      [`${prefix}City`]: address.city,
      [`${prefix}State`]: address.state,
      [`${prefix}PostalCode`]: address.postalCode,
      [`${prefix}Country`]: address.country,
      [`${prefix}Use`]: address.use,
      [`${prefix}Text`]: address.text,
    };
  }

  convertRatio(ration: TRatio | undefined): ExtractorValueType {
    return ration
      ? `${ration.numerator?.value ?? '[No value]'} ${ration.numerator?.unit ?? '[No unit]'}` +
          ` / ${ration.denominator?.value ?? '[No value]'} ${ration.denominator?.unit ?? '[No unit]'}`
      : ration;
  }

  convertIdentifier(identifier: TIdentifier | undefined): ExtractorValueType {
    return identifier
      ? `${identifier.id || this.getFriendlyNameForSystem(identifier.system)}=${identifier.value}`
      : identifier;
  }

  getIdentifierFields(
    identifier: TIdentifier | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!identifier) return {};
    return {
      [`${prefix}System`]:
        identifier.id || this.getFriendlyNameForSystem(identifier.system),
      [`${prefix}Value`]: identifier.value,
      [`${prefix}Type`]: this.convertCodeableConcept(identifier.type),
      [`${prefix}Use`]: identifier.use,
    };
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

  getHumanNameFields(
    humanName: THumanName | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!humanName) return {};
    return {
      [`${prefix}Use`]: humanName.use,
      [`${prefix}Text`]: humanName.text,
      [`${prefix}Family`]: humanName.family,
      [`${prefix}Given`]: humanName.given?.join(', '),
      [`${prefix}Prefix`]: humanName.prefix?.join(', '),
      [`${prefix}Suffix`]: humanName.suffix?.join(', '),
    };
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
      ? `${dosage.doseQuantity?.value ?? '[No value]'} ${dosage.doseQuantity?.unit ?? '[No unit]'}` +
          ` (${dosage.rateRatio?.numerator?.value ?? '[No value]'} ${dosage.rateRatio?.numerator?.unit ?? '[No unit]'}` +
          ` / ${dosage.rateRatio?.denominator?.value ?? 'No value]'} ${dosage.rateRatio?.denominator?.unit ?? '[No unit]'})`
      : dosage;
  }

  getExtensionValue(extension: TExtension | undefined): ExtractorValueType {
    if (!extension) return extension;
    if (extension.valueCoding) {
      return this.convertCoding(extension.valueCoding);
    }
    if (extension.valueCodeableConcept) {
      return this.convertCodeableConcept(extension.valueCodeableConcept);
    }
    if (extension.valueReference) {
      return this.convertReference(extension.valueReference);
    }
    if (extension.valueQuantity) {
      return this.convertQuantity(extension.valueQuantity);
    }
    if (extension.valueAddress) {
      return this.convertAddress(extension.valueAddress);
    }
    if (extension.valueRatio) {
      return this.convertRatio(extension.valueRatio);
    }
    return (
      extension.valueString ||
      extension.valueBoolean ||
      extension.valueCode ||
      extension.valueInteger ||
      extension.valueDecimal ||
      extension.valueUri ||
      extension.valueBase64Binary
    );
  }

  convertExtension(extension: TExtension | undefined): ExtractorValueType {
    if (!extension) return extension;
    const url = this.getFriendlyNameForSystem(extension.url);
    return url
      ? `${url}=${this.getExtensionValue(extension)}`
      : this.getExtensionValue(extension);
  }

  getExtensionFields(
    extension: TExtension | undefined,
    prefix: string
  ): Record<string, ExtractorValueType> {
    if (!extension) return {};
    return {
      [`${prefix}Id`]: extension.id,
      [`${prefix}Url`]: this.getFriendlyNameForSystem(extension.url),
      [`${prefix}Value`]: this.getExtensionValue(extension),
    };
  }

  getExtensionByUrl(
    extensions: TExtension[] | undefined,
    url: string
  ): TExtension | undefined {
    if (!extensions) return undefined;
    const extension = extensions.find(ext => ext.url === url);
    if (!extension) return undefined;
    return extension;
  }

  getExtensionValueByUrl(
    extensions: TExtension[] | undefined,
    url: string
  ): ExtractorValueType {
    if (!extensions) return undefined;
    const extension = this.getExtensionByUrl(extensions, url);
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
