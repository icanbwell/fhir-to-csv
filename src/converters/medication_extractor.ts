import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TMedication } from '../types/resources/Medication';

export class MedicationExtractor extends BaseResourceExtractor<TMedication> {
  async extract(medication: TMedication): Promise<Record<string, ExtractorValueType>> {
    return {
      id: medication.id,
      code: medication.code?.coding?.[0]?.code,
      codeDisplay: medication.code?.coding?.[0]?.display,
      status: medication.status,
      manufacturer: medication.manufacturer?.display,
      form: medication.form?.coding?.[0]?.code,
      ingredientCodes: medication.ingredient?.map(
        ing => ing.itemCodeableConcept?.coding?.[0]?.code
      ),
      amount: medication.amount?.numerator?.value,
      batch: {
        lotNumber: medication.batch?.lotNumber,
        expirationDate: medication.batch?.expirationDate?.toString(),
      },
    };
  }
}
