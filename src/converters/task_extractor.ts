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
      code: this.convertCodeableConcept(task.code),
      focus: this.convertReference(task.focus),
      for: this.convertReference(task.for_),
      authoredOn: this.convertDateTime(task.authoredOn),
      lastModified: this.convertDateTime(task.lastModified),
      requester: this.convertReference(task.requester),
      identifier1: this.convertIdentifier(task.identifier?.[0]),
      identifier2: this.convertIdentifier(task.identifier?.[1]),
      identifier3: this.convertIdentifier(task.identifier?.[2]),
      identifier4: this.convertIdentifier(task.identifier?.[3]),
      identifier5: this.convertIdentifier(task.identifier?.[4]),
      instantiatesCanonical: task.instantiatesCanonical,
    };
  }
}