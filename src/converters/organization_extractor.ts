import { BaseResourceExtractor } from './base_extractor';
import { TOrganization } from '../types/resources/Organization';

export class OrganizationExtractor extends BaseResourceExtractor<TOrganization> {
  extract(organization: TOrganization): Record<string, any> {
    return {
      id: organization.id,
      name: organization.name,
      active: organization.active,
      typeCode: organization.type?.[0]?.coding?.[0]?.code,
      typeDisplay: organization.type?.[0]?.coding?.[0]?.display,
      addressLine: organization.address?.[0]?.line?.[0],
      addressCity: organization.address?.[0]?.city,
      addressState: organization.address?.[0]?.state,
      addressPostalCode: organization.address?.[0]?.postalCode,
      contactNames: organization.contact?.map(contact => contact.name?.text),
    };
  }
}
