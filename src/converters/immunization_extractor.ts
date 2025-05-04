import { BaseResourceExtractor } from './base_extractor';
import { TImmunization } from '../types/resources/Immunization';

export class ImmunizationExtractor extends BaseResourceExtractor<TImmunization> {
  extract(immunization: TImmunization): Record<string, any> {
    return {
      id: immunization.id,
      patientId: immunization.patient?.reference?.split('/')?.pop(),
      status: immunization.status,
      vaccineCode: immunization.vaccineCode?.coding?.[0]?.code,
      vaccineDisplay: immunization.vaccineCode?.coding?.[0]?.display,
      occurrenceDatetime: immunization.occurrenceDateTime?.toString(),
      lotNumber: immunization.lotNumber,
      manufacturer: immunization.manufacturer?.display,
    };
  }
}
