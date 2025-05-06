import { BaseResourceExtractor } from './base_extractor';
import { TProcedure } from '../types/resources/Procedure';

export class ProcedureExtractor extends BaseResourceExtractor<TProcedure> {
  async extract(procedure: TProcedure): Promise<Record<string, any>> {
    return {
      id: procedure.id,
      patientId: procedure.subject?.reference?.split('/')?.pop(),
      status: procedure.status,
      code: procedure.code?.coding?.[0]?.code,
      codeDisplay: procedure.code?.coding?.[0]?.display,
      performedDatetime: procedure.performedDateTime?.toString(),
      performedPeriodStart: procedure.performedPeriod?.start?.toString(),
      performedPeriodEnd: procedure.performedPeriod?.end?.toString(),
    };
  }
}
