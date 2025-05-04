import { BaseResourceExtractor } from './base_extractor';
import { TCareTeam } from '../types/resources/CareTeam';

export class CareTeamExtractor extends BaseResourceExtractor<TCareTeam> {
  extract(careTeam: TCareTeam): Record<string, any> {
    return {
      id: careTeam.id,
      patientId: careTeam.subject?.reference?.split('/')?.pop(),
      status: careTeam.status,
      category: careTeam.category?.[0]?.coding?.[0]?.code,
      categoryDisplay: careTeam.category?.[0]?.coding?.[0]?.display,
      name: careTeam.name,
      participants: careTeam.participant?.map(participant => ({
        memberId: participant.member?.reference?.split('/')?.pop(),
        roleCode: participant.role?.[0].coding?.[0]?.code,
        roleDisplay: participant.role?.[0].coding?.[0]?.display,
        periodStart: participant.period?.start?.toString(),
        periodEnd: participant.period?.end?.toString(),
      })),
    };
  }
}
