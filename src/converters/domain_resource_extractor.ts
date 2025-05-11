import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDomainResource } from '../types/resources/DomainResource';

export class DomainResourceExtractor extends BaseResourceExtractor<TDomainResource> {
  extract(
    resource: TDomainResource
  ): Record<string, ExtractorValueType> {
    return {
      id: resource.id,
      versionId: resource.meta?.versionId,
      lastUpdated: resource.meta?.lastUpdated?.toString(),
      sourceAssigningAuthority: resource.meta?.security?.find(
        security =>
          security.system ===
          'https://www.icanbwell.com/sourceAssigningAuthority'
      )?.code,
      connectionType: resource.meta?.security?.find(
        security =>
          security.system ===
          'https://www.icanbwell.com/connectionType'
      )?.code,
      vendor: resource.meta?.security?.find(
        security =>
          security.system ===
          'https://www.icanbwell.com/vendor'
      )?.code,
      owner: resource.meta?.security?.find(
        security =>
          security.system ===
          'https://www.icanbwell.com/owner'
      )?.code,
      source: resource.meta?.source,
      hidden: resource.meta?.tag?.find(
        tag =>
          tag.system ===
          'https://fhir.icanbwell.com/4_0_0/CodeSystem/server-behavior'
      )?.code,
      profile1: resource.meta?.profile?.[0],
      tag1: resource.meta?.tag?.[0]?.code,
      tag2: resource.meta?.tag?.[1]?.code,
      tag3: resource.meta?.tag?.[2]?.code,
      extensions: resource.extension?.length,
      ...this.getExtensionFields(
        resource.extension?.[0],
        'extension1'
      ),
      ...this.getExtensionFields(
        resource.extension?.[1],
        'extension2'
      ),
      ...this.getExtensionFields(
        resource.extension?.[2],
        'extension3'
      ),
      ...this.getExtensionFields(
        resource.extension?.[3],
        'extension4'
      ),
      ...this.getExtensionFields(
        resource.extension?.[4],
        'extension5'
      ),
    };
  }
}
