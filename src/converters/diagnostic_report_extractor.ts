import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDiagnosticReport } from '../types/resources/DiagnosticReport';

export class DiagnosticReportExtractor extends BaseResourceExtractor<TDiagnosticReport> {
  async extract(report: TDiagnosticReport): Promise<Record<string, ExtractorValueType>> {
    return {
      id: report.id,
      patientId: report.subject?.reference?.split('/')?.pop(),
      status: report.status,
      category: report.category?.[0]?.coding?.[0]?.code,
      code: report.code?.coding?.[0]?.code,
      codeDisplay: report.code?.coding?.[0]?.display,
      effectiveDatetime: report.effectiveDateTime?.toString(),
      issued: report.issued?.toString(),
      conclusion: report.conclusion,
      presentedForm: report.presentedForm?.[0]?.url,
      performer: report.performer?.[0]?.reference,
      resultsInterpreter: report.resultsInterpreter?.[0]?.reference,
    };
  }
}
