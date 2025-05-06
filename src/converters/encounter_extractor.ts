import { BaseResourceExtractor } from './base_extractor';
import { TEncounter } from '../types/resources/Encounter';

export class EncounterExtractor extends BaseResourceExtractor<TEncounter> {
  async extract(encounter: TEncounter): Promise<Record<string, any>> {
    return {
      id: encounter.id,
      patientId: encounter.subject?.reference?.split('/')?.pop(),
      status: encounter.status,
      class: encounter.class_?.code,
      type: encounter.type?.[0]?.coding?.[0]?.code,
      periodStart: encounter.period?.start?.toString(),
      periodEnd: encounter.period?.end?.toString(),
      reasonCode: encounter.reasonCode?.[0]?.coding?.[0]?.code,
    };
  }
}
