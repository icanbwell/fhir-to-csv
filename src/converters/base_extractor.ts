import { TCoding } from '../types/partials/Coding';
import { TReference } from '../types/partials/Reference';
import { TCodeableConcept } from '../types/partials/CodeableConcept';
import { TPeriod } from '../types/partials/Period';
import { TQuantity } from '../types/partials/Quantity';
import { TAddress } from '../types/partials/Address';
import { TRatio } from '../types/partials/Ratio';
import { TIdentifier } from '../types/partials/Identifier';
import { THumanName } from '../types/partials/HumanName';
import { TContactPoint } from '../types/partials/ContactPoint';
import { TDosageDoseAndRate } from '../types/partials/DosageDoseAndRate';

export type ExtractorValueType = string | number | Date | undefined | boolean;

export abstract class BaseResourceExtractor<T> {
  abstract extract(resource: T): Promise<Record<string, ExtractorValueType>>;

  convertCoding(coding: TCoding | undefined): ExtractorValueType {
    return coding
      ? `${coding.code} ${this.getFriendlyNameForSystem(coding.system)} (${coding.display})`
      : coding;
  }

  getFriendlyNameForSystem(system: string | undefined): string | undefined {
    if (!system) return system;
    const systemMap: Record<string, string> = {
      'http://loinc.org': 'Loinc',
      'http://snomed.info/sct': 'Snomed',
      'http://hl7.org/fhir/v2/0203': 'HL7',
      'http://hl7.org/fhir/v3/NullFlavor': 'HL7',
      'http://terminology.hl7.org/CodeSystem/v3-NullFlavor': 'HL7',
      'http://www.ama-assn.org/go/cpt': 'CPT',
      'http://www.nlm.nih.gov/research/umls/rxnorm': 'RxNorm',
      'http://hl7.org/fhir/sid/icd-10-cm': 'ICD-10-CM',
      'http://hl7.org/fhir/sid/icd-10': 'ICD-10',
      'http://hl7.org/fhir/sid/icd-9-cm': 'ICD-9-CM',
      'http://hl7.org/fhir/sid/icd-9': 'ICD-9',
      'http://hl7.org/fhir/sid/icd-11': 'ICD-11',
      'http://hl7.org/fhir/sid/icd-11-cm': 'ICD-11-CM',
      'http://hl7.org/fhir/sid/icd-11-pcs': 'ICD-11-PCS',
      'http://hl7.org/fhir/sid/cvx': 'CVX',
    };
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
        .map(
          coding =>
            `${coding.code} ${this.getFriendlyNameForSystem(coding.system)} (${coding.display})`
        )
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

  convertPeriod(period: TPeriod | undefined): ExtractorValueType {
    return period
      ? `${period.start?.toString()} - ${period.end?.toString()}`
      : period;
  }

  convertQuantity(quantity: TQuantity | undefined): ExtractorValueType {
    return quantity
      ? `${quantity.value} ${quantity.unit} (${this.getFriendlyNameForSystem(quantity.system)})`
      : quantity;
  }

  convertAddress(address: TAddress | undefined): ExtractorValueType {
    return address
      ? `${address.line?.join(', ')} ${address.city}, ${address.state} ${address.postalCode} (${address.country})`
      : address;
  }

  convertRatio(ration: TRatio | undefined): ExtractorValueType {
    return ration
      ? `${ration.numerator?.value} ${ration.numerator?.unit} / ${ration.denominator?.value} ${ration.denominator?.unit}`
      : ration;
  }

  convertIdentifier(identifier: TIdentifier | undefined): ExtractorValueType {
    return identifier
      ? `${(identifier.id || this, this.getFriendlyNameForSystem(identifier.system))} | ${identifier.value}`
      : identifier;
  }

  convertHumanName(humanName: THumanName | undefined): ExtractorValueType {
    return humanName
      ? `${humanName.given?.join(' ')} ${humanName.family} (${humanName.use})`
      : humanName;
  }

  convertContactPoint(
    contactPoint: TContactPoint | undefined
  ): ExtractorValueType {
    return contactPoint
      ? `${this.getFriendlyNameForSystem(contactPoint.system)} | ${contactPoint.value} (${contactPoint.use})`
      : contactPoint;
  }

  convertDosageAndRate(
    dosage: TDosageDoseAndRate | undefined
  ): ExtractorValueType {
    return dosage
      ? `${dosage.doseQuantity?.value} ${dosage.doseQuantity?.unit} (${dosage.rateRatio?.numerator?.value} ${dosage.rateRatio?.numerator?.unit} / ${dosage.rateRatio?.denominator?.value} ${dosage.rateRatio?.denominator?.unit})`
      : dosage;
  }
}

// Utility type for extractors
export type Extractor<T> = new () => BaseResourceExtractor<T>;
