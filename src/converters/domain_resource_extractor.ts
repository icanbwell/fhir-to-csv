import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDomainResource } from '../types/resources/DomainResource';

export class DomainResourceExtractor extends BaseResourceExtractor<TDomainResource> {
  async extract(
    resource: TDomainResource
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: resource.id,
      versionId: resource.meta?.versionId,
      lastUpdated: resource.meta?.lastUpdated?.toString(),
      sourceAssigningAuthority: resource.meta?.security?.find(
        security =>
          security.system ===
          'https://www.icanbwell.com/sourceAssigningAuthority'
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
      extension1: this.convertExtension(resource.extension?.[0]),
      extension2: this.convertExtension(resource.extension?.[1]),
      extension3: this.convertExtension(resource.extension?.[2]),
      extension4: this.convertExtension(resource.extension?.[3]),
      extension5: this.convertExtension(resource.extension?.[4]),
    };
  }
}
