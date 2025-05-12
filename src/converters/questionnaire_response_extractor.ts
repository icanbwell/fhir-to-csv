import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TQuestionnaireResponse } from '../types/resources/QuestionnaireResponse';
import { TQuestionnaireResponseAnswer } from '../types/partials/QuestionnaireResponseAnswer';

export class QuestionnaireResponseExtractor extends BaseResourceExtractor<TQuestionnaireResponse> {
  extract(
    questionnaireResponse: TQuestionnaireResponse
  ): Record<string, ExtractorValueType> {
    return {
      id: questionnaireResponse.id,
      status: questionnaireResponse.status,
      subjectId: this.getReferenceId(questionnaireResponse.subject),
      authored: this.convertDateTime(questionnaireResponse.authored),
      author: this.convertReference(questionnaireResponse.author),
      questionnaire: questionnaireResponse.questionnaire,
      answer1: this.extractAnswer(questionnaireResponse.item?.[0]),
      answer2: this.extractAnswer(questionnaireResponse.item?.[1]),
      answer3: this.extractAnswer(questionnaireResponse.item?.[2]),
      answer4: this.extractAnswer(questionnaireResponse.item?.[3]),
      answer5: this.extractAnswer(questionnaireResponse.item?.[4]),
      answer6: this.extractAnswer(questionnaireResponse.item?.[5]),
      answer7: this.extractAnswer(questionnaireResponse.item?.[6]),
      answer8: this.extractAnswer(questionnaireResponse.item?.[7]),
      answer9: this.extractAnswer(questionnaireResponse.item?.[8]),
      answer10: this.extractAnswer(questionnaireResponse.item?.[9]),
      answer11: this.extractAnswer(questionnaireResponse.item?.[10]),
      answer12: this.extractAnswer(questionnaireResponse.item?.[11]),
      answer13: this.extractAnswer(questionnaireResponse.item?.[12]),
      answer14: this.extractAnswer(questionnaireResponse.item?.[13]),
      answer15: this.extractAnswer(questionnaireResponse.item?.[14]),
      answer16: this.extractAnswer(questionnaireResponse.item?.[15]),
      answer17: this.extractAnswer(questionnaireResponse.item?.[16]),
      answer18: this.extractAnswer(questionnaireResponse.item?.[17]),
      answer19: this.extractAnswer(questionnaireResponse.item?.[18]),
      answer20: this.extractAnswer(questionnaireResponse.item?.[19]),
    };
  }

  private extractAnswer(answer: TQuestionnaireResponseAnswer | undefined): ExtractorValueType {
    if (!answer) return undefined;
    if (answer.valueBoolean !== undefined) {
      return answer.valueBoolean
    }
    if (answer.valueInteger !== undefined) {
      return answer.valueInteger
    }
    if (answer.valueString !== undefined) {
      return answer.valueString
    }
    if (answer.valueDate !== undefined) {
      return this.convertDateTime(answer.valueDate)
    }
    if (answer.valueReference !== undefined) {
      return this.convertReference(answer.valueReference)
    }
    if (answer.valueCoding !== undefined) {
      return this.convertCodeableConcept(answer.valueCoding)
    }
    if (answer.valueQuantity !== undefined) {
      return this.convertQuantity(answer.valueQuantity)
    }
    if (answer.valueTime !== undefined) {
      return this.convertDateTime(answer.valueTime)
    }
    if (answer.valueUri !== undefined) {
      return answer.valueUri
    }
    if (answer.valueDecimal !== undefined) {
      return answer.valueDecimal
    }
    if (answer.valueDateTime !== undefined) {
      return this.convertDateTime(answer.valueDateTime)
    }
  }
}