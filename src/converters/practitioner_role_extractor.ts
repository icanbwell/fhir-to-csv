import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TPractitionerRole } from '../types/resources/PractitionerRole';

export class PractitionerRoleExtractor extends BaseResourceExtractor<TPractitionerRole> {
  async extract(
    practitionerRole: TPractitionerRole
  ): Promise<Record<string, ExtractorValueType>> {
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
      code: practitionerRole.code?.map(code => code.coding?.[0]?.display),
      specialty: practitionerRole.specialty?.map(
        specialty => specialty.coding?.[0]?.display
      ),
      location: practitionerRole.location?.map(location => location.reference),
      healthcareService: practitionerRole.healthcareService?.map(
        service => service.reference
      ),
      telecom: practitionerRole.telecom?.map(contact => ({
        system: contact.system,
        value: contact.value,
        use: contact.use,
      })),
      availableTime: practitionerRole.availableTime?.map(time => ({
        daysOfWeek: time.daysOfWeek,
        availableStartTime: time.availableStartTime,
        availableEndTime: time.availableEndTime,
      })),
    };
  }
}
