import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedication } from '../types/resources/Medication';

export class MedicationExtractor extends BaseResourceExtractor<TMedication> {
  extract(
    medication: TMedication
  ): Record<string, ExtractorValueType> {
    return {
      id: medication.id,
      ...this.getCodeableConceptFields(
        medication.code,
        'code'
      ),
      status: medication.status,
      manufacturerId: this.getReferenceId(medication.manufacturer),
      form: this.convertCodeableConcept(medication.form),
      ingredientItem1: this.convertReference(
        medication.ingredient?.[0]?.itemReference
      ) || this.convertCodeableConcept(medication.ingredient?.[0]?.itemCodeableConcept),
      ingredientStrength1: this.convertRatio(
        medication.ingredient?.[0]?.strength
      ),
      ingredientIsActive1: medication.ingredient?.[0]?.isActive,
      ingredientItem2: this.convertReference(
        medication.ingredient?.[1]?.itemReference
      ) || this.convertCodeableConcept(medication.ingredient?.[1]?.itemCodeableConcept),
      ingredientStrength2: this.convertRatio(
        medication.ingredient?.[1]?.strength
      ),
      ingredientIsActive2: medication.ingredient?.[1]?.isActive,
      ingredientItem3: this.convertReference(
        medication.ingredient?.[2]?.itemReference
      ) || this.convertCodeableConcept(medication.ingredient?.[2]?.itemCodeableConcept),
      ingredientStrength3: this.convertRatio(
        medication.ingredient?.[2]?.strength
      ),
      ingredientIsActive3: medication.ingredient?.[2]?.isActive,
      ingredientItem4: this.convertReference(
        medication.ingredient?.[3]?.itemReference
      ) || this.convertCodeableConcept(medication.ingredient?.[3]?.itemCodeableConcept),
      ingredientStrength4: this.convertRatio(
        medication.ingredient?.[3]?.strength
      ),
      ingredientIsActive4: medication.ingredient?.[3]?.isActive,
      ingredientItem5: this.convertReference(
        medication.ingredient?.[4]?.itemReference
      ) || this.convertCodeableConcept(medication.ingredient?.[4]?.itemCodeableConcept),
      ingredientStrength5: this.convertRatio(
        medication.ingredient?.[4]?.strength
      ),
      ingredientIsActive5: medication.ingredient?.[4]?.isActive,
    };
  }
}
