import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TProvenance } from '../types/resources/Provenance';

export class ProvenanceExtractor extends BaseResourceExtractor<TProvenance> {
  async extract(
    provenance: TProvenance
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: provenance.id,
      recorded: this.convertDateTime(provenance.recorded),
      targetReference1: this.getReferenceId(provenance.target?.[0]),
      targetReference2: this.getReferenceId(provenance.target?.[1]),
      targetReference3: this.getReferenceId(provenance.target?.[2]),

      agent1Type: this.convertCodeableConcept(
        provenance.agent?.[0]?.type
      ),
      agent1Who: this.getReferenceId(provenance.agent?.[0]?.who),
      agent2Type: this.convertCodeableConcept(
        provenance.agent?.[1]?.type
      ),
      agent2Who: this.getReferenceId(provenance.agent?.[1]?.who),
      agent3Type: this.convertCodeableConcept(
        provenance.agent?.[2]?.type
      ),
      agent3Who: this.getReferenceId(provenance.agent?.[2]?.who),
      reason1: this.convertCodeableConcept(
        provenance.reason?.[0]
      ),
      reason2: this.convertCodeableConcept(
        provenance.reason?.[1]
      ),
      reason3: this.convertCodeableConcept(
        provenance.reason?.[2]
      ),
      signature1Type: this.convertCodeableConcept(
        provenance.signature?.[0]?.type?.[0]
      ),
      signature1When: this.convertDateTime(
        provenance.signature?.[0]?.when
      ),
      signature1Who: this.convertReference(
        provenance.signature?.[0]?.who
      ),
      signature2Type: this.convertCodeableConcept(
        provenance.signature?.[1]?.type?.[0]
      ),
      signature2When: this.convertDateTime(
        provenance.signature?.[1]?.when
      ),
      signature2Who: this.convertReference(
        provenance.signature?.[1]?.who
      ),
      signature3Type: this.convertCodeableConcept(
        provenance.signature?.[2]?.type?.[0]
      ),
      signature3When: this.convertDateTime(
        provenance.signature?.[2]?.when
      ),
      signature3Who: this.convertReference(
        provenance.signature?.[2]?.who
      ),
    };
  }
}
