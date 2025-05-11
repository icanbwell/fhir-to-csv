// `src/converters/measure_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMeasure } from '../types/resources/Measure';

export class MeasureExtractor extends BaseResourceExtractor<TMeasure> {
  async extract(
    measure: TMeasure
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: measure.id,
      name: measure.name,
      title: measure.title,
      status: measure.status,
      description: measure.description,
      ...this.getCodeableConceptFields(
        measure.subjectCodeableConcept,
        'subject'
      ),
      subjectReference: this.convertReference(measure.subjectReference),
    };
  }
}
