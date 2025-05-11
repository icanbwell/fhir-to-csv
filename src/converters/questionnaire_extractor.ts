import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TQuestionnaire } from '../types/resources/Questionnaire';
import { TQuestionnaireItem } from '../types/partials/QuestionnaireItem';

export class QuestionnaireExtractor extends BaseResourceExtractor<TQuestionnaire> {
  async extract(
    questionnaire: TQuestionnaire
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: questionnaire.id,
      url: questionnaire.url,
      version: questionnaire.version,
      name: questionnaire.name,
      title: questionnaire.title,
      status: questionnaire.status,
      date: this.convertDateTime(questionnaire.date),
      publisher: questionnaire.publisher,
      description: questionnaire.description,
      subjectType1: questionnaire.subjectType?.[0],
      subjectType2: questionnaire.subjectType?.[1],
      subjectType3: questionnaire.subjectType?.[2],
      subjectType4: questionnaire.subjectType?.[3],
      subjectType5: questionnaire.subjectType?.[4],
      item1: this.extractItem(questionnaire.item?.[0]),
      item2: this.extractItem(questionnaire.item?.[1]),
      item3: this.extractItem(questionnaire.item?.[2]),
      item4: this.extractItem(questionnaire.item?.[3]),
      item5: this.extractItem(questionnaire.item?.[4]),
      item6: this.extractItem(questionnaire.item?.[5]),
      item7: this.extractItem(questionnaire.item?.[6]),
      item8: this.extractItem(questionnaire.item?.[7]),
      item9: this.extractItem(questionnaire.item?.[8]),
      item10: this.extractItem(questionnaire.item?.[9]),
      item11: this.extractItem(questionnaire.item?.[10]),
      item12: this.extractItem(questionnaire.item?.[11]),
      item13: this.extractItem(questionnaire.item?.[12]),
      item14: this.extractItem(questionnaire.item?.[13]),
      item15: this.extractItem(questionnaire.item?.[14]),
      item16: this.extractItem(questionnaire.item?.[15]),
      item17: this.extractItem(questionnaire.item?.[16]),
      item18: this.extractItem(questionnaire.item?.[17]),
      item19: this.extractItem(questionnaire.item?.[18]),
      item20: this.extractItem(questionnaire.item?.[19]),
    };
  }

  private extractItem(item: TQuestionnaireItem | undefined): ExtractorValueType {
    if (!item) return undefined;
    return item.text;
  }
}