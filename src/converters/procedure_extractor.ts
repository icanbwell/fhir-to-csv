import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TProcedure } from '../types/resources/Procedure';

export class ProcedureExtractor extends BaseResourceExtractor<TProcedure> {
  async extract(
    procedure: TProcedure
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: procedure.id,
      patientId: this.getReferenceId(procedure.subject),
      status: procedure.status,
      ...this.getCodeableConceptFields(
        procedure.category,
        'category'
      ),
      ...this.getCodeableConceptFields(
        procedure.code,
        'code'
      ),
      performed: this.convertDateTime(procedure.performedDateTime),
      reasonCode1: this.convertCodeableConcept(
        procedure.reasonCode?.[0]
      ),
      reasonCode2: this.convertCodeableConcept(
        procedure.reasonCode?.[1]
      ),
      reasonCode3: this.convertCodeableConcept(
        procedure.reasonCode?.[2]
      ),
      performer1: this.convertReference(procedure.performer?.[0]?.actor),
      performer2: this.convertReference(procedure.performer?.[1]?.actor),
      performer3: this.convertReference(procedure.performer?.[2]?.actor),
      location: this.convertReference(procedure.location),
      bodySite1: this.convertCodeableConcept(
        procedure.bodySite?.[0]
      ),
      bodySite2: this.convertCodeableConcept(
        procedure.bodySite?.[1]
      ),
      bodySite3: this.convertCodeableConcept(
        procedure.bodySite?.[2]
      ),
      outcome: this.convertCodeableConcept(procedure.outcome),
      report1: this.convertReference(procedure.report?.[0]),
      report2: this.convertReference(procedure.report?.[1]),
      report3: this.convertReference(procedure.report?.[2]),
      complication1: this.convertCodeableConcept(
        procedure.complication?.[0]
      ),
      complication2: this.convertCodeableConcept(
        procedure.complication?.[1]
      ),
      complication3: this.convertCodeableConcept(
        procedure.complication?.[2]
      ),
      followUp1: this.convertCodeableConcept(
        procedure.followUp?.[0]
      ),
      followUp2: this.convertCodeableConcept(
        procedure.followUp?.[1]
      ),
      followUp3: this.convertCodeableConcept(
        procedure.followUp?.[2]
      ),
      note1: procedure.note?.[0]?.text,
      note2: procedure.note?.[1]?.text,
      note3: procedure.note?.[2]?.text
    };
  }
}
