import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TProvenance } from '../types/resources/Provenance';

export class ProvenanceExtractor extends BaseResourceExtractor<TProvenance> {
  async extract(provenance: TProvenance): Promise<Record<string, ExtractorValueType>> {
    return {
      id: provenance.id,
      recorded: provenance.recorded?.toString(),
      targetReferences: provenance.target?.map(target => target.reference),
      agentTypes: provenance.agent?.map(agent => agent.type?.coding?.[0]?.code),
      agentWhoReferences: provenance.agent?.map(agent => agent.who?.reference),
      reasonCodes: provenance.reason?.map(reason => reason.coding?.[0]?.code),
      signature: provenance.signature?.map(sig => ({
        type: sig.type?.[0]?.code,
        when: sig.when?.toString(),
        whoReference: sig.who?.reference,
      })),
    };
  }
}
