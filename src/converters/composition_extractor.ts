// `src/converters/composition_extractor.ts`
import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TComposition } from '../types/resources/Composition';

export class CompositionExtractor extends BaseResourceExtractor<TComposition> {
  async extract(composition: TComposition): Promise<Record<string, ExtractorValueType>> {
    return {
      id: composition.id,
      status: composition.status,
      ...this.getCodeableConceptFields(
        composition.type,
        'type'
      ),
      ...this.getCodeableConceptFields(
        composition.category?.[0],
        'category1'
      ),
      category2: this.convertCodeableConcept(
        composition.category?.[1]
      ),
      category3: this.convertCodeableConcept(
        composition.category?.[2]
      ),
      subject: this.convertReference(composition.subject),
      encounter: this.convertReference(composition.encounter),
      date: this.convertDateTime(composition.date),
      author1: this.convertReference(
        composition.author?.[0]
      ),
      author2: this.convertReference(
        composition.author?.[1]
      ),
      author3: this.convertReference(
        composition.author?.[2]
      ),
      title: composition.title,
      confidentiality: composition.confidentiality,
      sections: composition.section?.length,
      section1Title: composition.section?.[0]?.title,
      section1Code: this.convertCodeableConcept(
        composition.section?.[0]?.code
      ),
      section1Text: composition.section?.[0]?.text?.div,
      section1Entry1: this.convertReference(
        composition.section?.[0]?.entry?.[0]
      ),
      section1Entry2: this.convertReference(
        composition.section?.[0]?.entry?.[1]
      ),
      section2Title: composition.section?.[1]?.title,
      section2Code: this.convertCodeableConcept(
        composition.section?.[1]?.code
      ),
      section2Text: composition.section?.[1]?.text?.div,
      section2Entry1: this.convertReference(
        composition.section?.[1]?.entry?.[0]
      ),
      section2Entry2: this.convertReference(
        composition.section?.[1]?.entry?.[1]
      ),
      section3Title: composition.section?.[2]?.title,
      section3Code: this.convertCodeableConcept(
        composition.section?.[2]?.code
      ),
      section3Text: composition.section?.[2]?.text?.div,
      section3Entry1: this.convertReference(
        composition.section?.[2]?.entry?.[0]
      ),
      section3Entry2: this.convertReference(
        composition.section?.[2]?.entry?.[1]
      ),
      section4Title: composition.section?.[3]?.title,
      section4Code: this.convertCodeableConcept(
        composition.section?.[3]?.code
      ),
      section4Text: composition.section?.[3]?.text?.div,
      section4Entry1: this.convertReference(
        composition.section?.[3]?.entry?.[0]
      ),
      section4Entry2: this.convertReference(
        composition.section?.[3]?.entry?.[1]
      ),
      section5Title: composition.section?.[4]?.title,
      section5Code: this.convertCodeableConcept(
        composition.section?.[4]?.code
      ),
      section5Text: composition.section?.[4]?.text?.div,
      section5Entry1: this.convertReference(
        composition.section?.[4]?.entry?.[0]
      ),
      section5Entry2: this.convertReference(
        composition.section?.[4]?.entry?.[1]
      ),

    };
  }
}