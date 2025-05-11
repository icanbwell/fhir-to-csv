import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TOrganization } from '../types/resources/Organization';

export class OrganizationExtractor extends BaseResourceExtractor<TOrganization> {
  async extract(
    organization: TOrganization
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: organization.id,
      name: organization.name,
      active: organization.active,
      type1: this.convertCodeableConcept(
        organization.type?.[0]
      ),
      type2: this.convertCodeableConcept(
        organization.type?.[1]
      ),
      type3: this.convertCodeableConcept(
        organization.type?.[2]
      ),
      identifier1: this.convertIdentifier(
        organization.identifier?.[0]
      ),
      identifier2: this.convertIdentifier(
        organization.identifier?.[1]
      ),
      identifier3: this.convertIdentifier(
        organization.identifier?.[2]
      ),
      identifier4: this.convertIdentifier(
        organization.identifier?.[3]
      ),
      identifier5: this.convertIdentifier(
        organization.identifier?.[4]
      ),
      address1: this.convertAddress(
        organization.address?.[0]
      ),
      address2: this.convertAddress(
        organization.address?.[1]
      ),
      address3: this.convertAddress(
        organization.address?.[2]
      ),
      contact1Name: this.convertHumanName(
        organization.contact?.[0]?.name
      ),
      contact1Telecom1: this.convertContactPoint(
        organization.contact?.[0]?.telecom?.[0]
      ),
      contact1Telecom2: this.convertContactPoint(
        organization.contact?.[0]?.telecom?.[1]
      ),
      contact1Address: this.convertAddress(
        organization.contact?.[0]?.address
      )
    };
  }
}
