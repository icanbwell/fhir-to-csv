import { BaseResourceExtractor } from './base_extractor';
import { TLocation } from '../types/resources/Location';

export class LocationExtractor extends BaseResourceExtractor<TLocation> {
  async extract(location: TLocation): Promise<Record<string, any>> {
    return {
      id: location.id,
      name: location.name,
      status: location.status,
      operationalStatus: location.operationalStatus,
      typeCode: location.type?.[0]?.coding?.[0]?.code,
      typeDisplay: location.type?.[0]?.coding?.[0]?.display,
      addressLine: location.address?.line?.[0],
      addressCity: location.address?.city,
      addressState: location.address?.state,
      addressPostalCode: location.address?.postalCode,
      managingOrganizationId: location.managingOrganization?.reference
        ?.split('/')
        ?.pop(),
    };
  }
}
