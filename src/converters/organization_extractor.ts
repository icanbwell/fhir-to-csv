import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TOrganization } from '../types/resources/Organization';

export class OrganizationExtractor extends BaseResourceExtractor<TOrganization> {
  extract(
    organization: TOrganization
  ): Record<string, ExtractorValueType> {
    return {
      id: organization.id,
      name: organization.name,
      active: organization.active,

      ...this.getCodeableConceptFields(
        organization.type?.[0],
        'type1'
      ),
      type2: this.convertCodeableConcept(
        organization.type?.[1]
      ),
      type3: this.convertCodeableConcept(
        organization.type?.[2]
      ),
      ...this.getIdentifierFields(
        organization.identifier?.[0],
        'identifier1'
      ),
      ...this.getIdentifierFields(
        organization.identifier?.[1],
        'identifier2'
      ),
      ...this.getIdentifierFields(
        organization.identifier?.[2],
        'identifier3'
      ),
      ...this.getIdentifierFields(
        organization.identifier?.[3],
        'identifier4'
      ),
      ...this.getIdentifierFields(
        organization.identifier?.[4],
        'identifier5'
      ),

      ...this.getAddressFields(
        organization.address?.[0],
        'address1'
      ),
      ...this.getAddressFields(
        organization.address?.[1],
        'address2'
      ),
      ...this.getAddressFields(
        organization.address?.[2],
        'address3'
      ),
      contact1Name: this.convertHumanName(
        organization.contact?.[0]?.name
      ),
      contact1Relationship: this.convertCodeableConcept(
        organization.contact?.[0]?.purpose
      ),
      contact1Email1: this.getEmail(
        organization.contact?.[0]?.telecom,
        0
      ),
      contact1Email2: this.getEmail(
        organization.contact?.[0]?.telecom,
        1
      ),
      contact1Phone1: this.getPhone(
        organization.contact?.[0]?.telecom,
        0
      ),
      contact1Phone2: this.getPhone(
        organization.contact?.[0]?.telecom,
        1
      ),
      contact1Address: this.convertAddress(
        organization.contact?.[0]?.address
      )
    };
  }
}
