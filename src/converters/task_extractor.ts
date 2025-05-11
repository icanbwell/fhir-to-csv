// `src/converters/task_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TTask } from '../types/resources/Task';

export class TaskExtractor extends BaseResourceExtractor<TTask> {
  async extract(task: TTask): Promise<Record<string, ExtractorValueType>> {
    return {
      id: task.id,
      status: task.status,
      intent: task.intent,
      priority: task.priority,
      description: task.description,
      ...this.getCodeableConceptFields(
        task.code,
        'code'
      ),
      focus: this.convertReference(task.focus),
      for: this.convertReference(task.for_),
      authoredOn: this.convertDateTime(task.authoredOn),
      lastModified: this.convertDateTime(task.lastModified),
      requester: this.convertReference(task.requester),

      ...this.getIdentifierFields(
        task.identifier?.[0],
        'identifier1'
      ),
      ...this.getIdentifierFields(
        task.identifier?.[1],
        'identifier2'
      ),
      ...this.getIdentifierFields(
        task.identifier?.[2],
        'identifier3'
      ),
      ...this.getIdentifierFields(
        task.identifier?.[3],
        'identifier4'
      ),
      ...this.getIdentifierFields(
        task.identifier?.[4],
        'identifier5'
      ),

      instantiatesCanonical: task.instantiatesCanonical,
    };
  }
}