import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TDevice } from '../types/resources/Device';

export class DeviceExtractor extends BaseResourceExtractor<TDevice> {
  extract(device: TDevice): Record<string, ExtractorValueType> {
    return {
      id: device.id,
      patientId: this.getReferenceId(device.patient),
      ...this.getCodeableConceptFields(
        device.type,
        'type'
      ),
      manufacturer: device.manufacturer,
      modelNumber: device.modelNumber,
      status: device.status,
      lotNumber: device.lotNumber,
      expirationDate: this.convertDateTime(device.expirationDate),
    };
  }
}
