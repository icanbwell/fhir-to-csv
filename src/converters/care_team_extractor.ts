import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TCareTeam } from '../types/resources/CareTeam';

export class CareTeamExtractor extends BaseResourceExtractor<TCareTeam> {
  extract(
    careTeam: TCareTeam
  ): Record<string, ExtractorValueType> {
    return {
      id: careTeam.id,
      patientId: this.getReferenceId(careTeam.subject),
      status: careTeam.status,
      category1: this.convertCodeableConcept(
        careTeam.category?.[0]
      ),
      category2: this.convertCodeableConcept(
        careTeam.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        careTeam.category?.[2]
      ),
      name: careTeam.name,
      periodStart: this.convertDateTime(
        careTeam.period?.start
      ),
      periodEnd: this.convertDateTime(
        careTeam.period?.end
      ),
      participant1: this.convertReference(
        careTeam.participant?.[0]?.member
      ),
      participant2: this.convertReference(
        careTeam.participant?.[1]?.member
      ),
      participant3: this.convertReference(
        careTeam.participant?.[2]?.member
      ),
    };
  }
}
