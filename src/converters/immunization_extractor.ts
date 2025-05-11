import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TImmunization } from '../types/resources/Immunization';

export class ImmunizationExtractor extends BaseResourceExtractor<TImmunization> {
  async extract(
    immunization: TImmunization
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: immunization.id,
      patientId: this.getReferenceId(immunization.patient),
      status: immunization.status,
      vaccineCode: this.convertCodeableConcept(immunization.vaccineCode),
      occurrence: this.convertDateTime(immunization.occurrenceDateTime),
      performer1: this.convertReference(immunization.performer?.[0]?.actor),
      performer2: this.convertReference(
        immunization.performer?.[1]?.actor
      ),
      site: this.convertCodeableConcept(immunization.site),
      route: this.convertCodeableConcept(immunization.route),
      doseQuantity: this.convertQuantity(immunization.doseQuantity),
    };
  }
}
