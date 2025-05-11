import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TProcedure } from '../types/resources/Procedure';

export class ProcedureExtractor extends BaseResourceExtractor<TProcedure> {
  async extract(procedure: TProcedure): Promise<Record<string, ExtractorValueType>> {
    return {
      id: procedure.id,
      patientId: procedure.subject?.reference?.split('/')?.pop(),
      status: procedure.status,
      code: procedure.code?.coding?.[0]?.code,
      codeDisplay: procedure.code?.coding?.[0]?.display,
      performedDatetime: procedure.performedDateTime?.toString(),
      performedPeriodStart: procedure.performedPeriod?.start?.toString(),
      performedPeriodEnd: procedure.performedPeriod?.end?.toString(),
      reasonCode: procedure.reasonCode?.[0]?.coding?.[0]?.display,
      outcome: procedure.outcome?.coding?.[0]?.display,
      performer: procedure.performer?.[0]?.actor?.reference,
      category: procedure.category?.coding?.[0]?.display,
      bodySite: procedure.bodySite?.[0]?.coding?.[0]?.display,
    };
  }
}
