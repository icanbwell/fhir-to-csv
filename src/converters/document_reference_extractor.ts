import { BaseResourceExtractor } from './base_extractor';
import { TDocumentReference } from '../types/resources/DocumentReference';

export class DocumentReferenceExtractor extends BaseResourceExtractor<TDocumentReference> {
  async extract(docRef: TDocumentReference): Promise<Record<string, any>> {
    return {
      id: docRef.id,
      patientId: docRef.subject?.reference?.split('/')?.pop(),
      status: docRef.status,
      type: docRef.type?.coding?.[0]?.code,
      typeDisplay: docRef.type?.coding?.[0]?.display,
      category: docRef.category?.[0]?.coding?.[0]?.code,
      date: docRef.date?.toString(),
      contentUrl: docRef.content?.[0]?.attachment?.url,
      contentTitle: docRef.content?.[0]?.attachment?.title,
    };
  }
}
