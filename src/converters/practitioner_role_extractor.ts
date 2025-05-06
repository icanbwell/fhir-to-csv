import { BaseResourceExtractor } from './base_extractor';
import { TPractitionerRole } from '../types/resources/PractitionerRole';

export class PractitionerRoleExtractor extends BaseResourceExtractor<TPractitionerRole> {
  async extract(practitionerRole: TPractitionerRole): Promise<Record<string, any>> {
    return {
      id: practitionerRole.id,
      practitionerId: practitionerRole.practitioner?.reference
        ?.split('/')
        ?.pop(),
      organizationId: practitionerRole.organization?.reference
        ?.split('/')
        ?.pop(),
      active: practitionerRole.active,
      specialtyCodes: practitionerRole.specialty?.map(
        specialty => specialty.coding?.[0]?.code
      ),
      specialtyDisplays: practitionerRole.specialty?.map(
        specialty => specialty.coding?.[0]?.display
      ),
      roleCodes: practitionerRole.code?.map(role => role.coding?.[0]?.code),
      roleDisplays: practitionerRole.code?.map(
        role => role.coding?.[0]?.display
      ),
    };
  }
}
