// `src/converters/measure_report_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMeasureReport } from '../types/resources/MeasureReport';

export class MeasureReportExtractor extends BaseResourceExtractor<TMeasureReport> {
  async extract(measureReport: TMeasureReport): Promise<Record<string, ExtractorValueType>> {
    return {
      id: measureReport.id,
      status: measureReport.status,
      type: measureReport.type,
      measure: measureReport.measure,
      subject: this.convertReference(measureReport.subject),
      date: this.convertDateTime(measureReport.date),
      reporter: this.convertReference(measureReport.reporter),
      periodStart: this.convertDateTime(measureReport.period?.start),
      periodEnd: this.convertDateTime(measureReport.period?.end),
    };
  }
}