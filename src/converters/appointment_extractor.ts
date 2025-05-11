import { BaseResourceExtractor, ExtractorValueType } from './base_extractor';
import { TAppointment } from '../types/resources/Appointment';

export class AppointmentExtractor extends BaseResourceExtractor<TAppointment> {
  async extract(
    appointment: TAppointment
  ): Promise<Record<string, ExtractorValueType>> {
    return {
      id: appointment.id,
      patientId: this.getReferenceId(appointment.participant?.[0]?.actor),
      status: appointment.status,
      type: this.convertCodeableConcept(appointment.appointmentType),
      reasonCode: this.convertCodeableConcepts(appointment.reasonCode),
      start: this.convertDateTime(appointment.start),
      end: this.convertDateTime(appointment.end),
      participant1: this.convertReference(
        appointment.participant?.[0]?.actor
      ),
      participant2: this.convertReference(
        appointment.participant?.[1]?.actor
      ),
      participant3: this.convertReference(
        appointment.participant?.[2]?.actor
      ),
    };
  }
}
