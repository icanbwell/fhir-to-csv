import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDevice } from '../types/resources/Device';

export class DeviceExtractor extends BaseResourceExtractor<TDevice> {
  async extract(device: TDevice): Promise<Record<string, ExtractorValueType>> {
    return {
      id: device.id,
      patientId: this.getReferenceId(device.patient),
      type: this.convertCodeableConcept(device.type),
      manufacturer: device.manufacturer,
      modelNumber: device.modelNumber,
      status: device.status,
      lotNumber: device.lotNumber,
      expirationDate: this.convertDateTime(device.expirationDate),
    };
  }
}
