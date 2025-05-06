import { BaseResourceExtractor } from './base_extractor';
import { TDevice } from '../types/resources/Device';

export class DeviceExtractor extends BaseResourceExtractor<TDevice> {
  async extract(device: TDevice): Promise<Record<string, any>> {
    return {
      id: device.id,
      patientId: device.patient?.reference?.split('/')?.pop(),
      status: device.status,
      type: device.type?.coding?.[0]?.code,
      typeDisplay: device.type?.coding?.[0]?.display,
      manufacturer: device.manufacturer,
      modelNumber: device.modelNumber,
      serialNumber: device.serialNumber,
      manufactureDate: device.manufactureDate?.toString(),
      expirationDate: device.expirationDate?.toString(),
    };
  }
}
