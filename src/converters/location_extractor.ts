import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TLocation } from '../types/resources/Location';

export class LocationExtractor extends BaseResourceExtractor<TLocation> {
  extract(
    location: TLocation
  ): Record<string, ExtractorValueType> {
    return {
      id: location.id,
      name: location.name,
      status: location.status,
      operationalStatus: this.convertCoding(location.operationalStatus),
      ...this.getCodeableConceptFields(
        location.type?.[0],
        'type1'
      ),
      type2: this.convertCodeableConcept(location.type?.[1]),
      type3: this.convertCodeableConcept(location.type?.[2]),
      ...this.getAddressFields(
        location.address,
        'address'
      ),
      managingOrganizationId: this.convertReference(
        location.managingOrganization
      ),
    };
  }
}
