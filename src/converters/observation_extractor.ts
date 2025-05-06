import { BaseResourceExtractor } from './base_extractor';
import { TObservation } from '../types/resources/Observation';

export class ObservationExtractor extends BaseResourceExtractor<TObservation> {
  async extract(observation: TObservation): Promise<Record<string, any>> {
    return {
      id: observation.id,
      patientId: observation.subject?.reference?.split('/')?.pop(),
      status: observation.status,
      category: observation.category?.[0]?.coding?.[0]?.code,
      code: observation.code?.coding?.[0]?.code,
      codeDisplay: observation.code?.coding?.[0]?.display,
      valueQuantity: observation.valueQuantity?.value,
      valueString: observation.valueString,
      effectiveDatetime: observation.effectiveDateTime?.toString(),
    };
  }
}
