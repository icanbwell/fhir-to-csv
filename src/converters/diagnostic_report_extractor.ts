import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDiagnosticReport } from '../types/resources/DiagnosticReport';

export class DiagnosticReportExtractor extends BaseResourceExtractor<TDiagnosticReport> {
  async extract(
    diagnosticReport: TDiagnosticReport
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: diagnosticReport.id,
      patientId: this.getReferenceId(diagnosticReport.subject),
      status: diagnosticReport.status,
      category1: this.convertCodeableConcept(diagnosticReport.category?.[0]),
      category2: this.convertCodeableConcept(diagnosticReport.category?.[1]),
      category3: this.convertCodeableConcept(diagnosticReport.category?.[2]),
      code: this.convertCodeableConcept(diagnosticReport.code),
      effective: this.convertDateTime(diagnosticReport.effectiveDateTime),
      issued: this.convertDateTime(diagnosticReport.issued),
      performer1: this.convertReference(diagnosticReport.performer?.[0]),
      performer2: this.convertReference(diagnosticReport.performer?.[1]),
      performer3: this.convertReference(diagnosticReport.performer?.[2]),
      result1: this.convertReference(diagnosticReport.result?.[0]),
      result2: this.convertReference(diagnosticReport.result?.[1]),
      result3: this.convertReference(diagnosticReport.result?.[2]),
      result4: this.convertReference(diagnosticReport.result?.[3]),
      result5: this.convertReference(diagnosticReport.result?.[4]),
      result6: this.convertReference(diagnosticReport.result?.[5]),
      result7: this.convertReference(diagnosticReport.result?.[6]),
      result8: this.convertReference(diagnosticReport.result?.[7]),
      result9: this.convertReference(diagnosticReport.result?.[8]),
      result10: this.convertReference(diagnosticReport.result?.[9]),
      conclusion: diagnosticReport.conclusion,
    };
  }
}
