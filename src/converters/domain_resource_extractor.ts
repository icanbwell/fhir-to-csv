import { BaseResourceExtractor } from './base_extractor';
import { TDomainResource } from '../types/resources/DomainResource';

export class DomainResourceExtractor extends BaseResourceExtractor<TDomainResource> {
  async extract(resource: TDomainResource): Promise<Record<string, any>> {
    return {
      id: resource.id,
      lastUpdated: resource.meta?.lastUpdated?.toString(),
      sourceAssigningAuthority: resource.meta?.security?.find(
        security =>
          security.system === 'https://www.icanbwell.com/sourceAssigningAuthority'
      )?.code,
      source: resource.meta?.source
    };
  }
}
