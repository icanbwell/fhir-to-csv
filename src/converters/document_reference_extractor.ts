import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDocumentReference } from '../types/resources/DocumentReference';

export class DocumentReferenceExtractor extends BaseResourceExtractor<TDocumentReference> {
  extract(
    documentReference: TDocumentReference
  ): Record<string, ExtractorValueType> {
    return {
      id: documentReference.id,
      status: documentReference.status,
      ...this.getCodeableConceptFields(
        documentReference.type,
        'type'
      ),
      ...this.getCodeableConceptFields(
        documentReference.category?.[0],
        'category1'
      ),
      category2: this.convertCodeableConcept(
        documentReference.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        documentReference.category?.[2]
      ),
      subject: this.convertReference(documentReference.subject),
      subjectId: this.getReferenceId(documentReference.subject),
      date: this.convertDateTime(documentReference.date),
      author1: this.getReferenceId(documentReference.author?.[0]),
      author2: this.getReferenceId(documentReference.author?.[1]),
      author3: this.getReferenceId(documentReference.author?.[2]),
      content1: documentReference.content?.[0]?.attachment?.url,
      content2: documentReference.content?.[1]?.attachment?.url,
      content3: documentReference.content?.[2]?.attachment?.url,
    };
  }
}
