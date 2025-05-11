// Automated Registration
import { PatientExtractor } from './converters/patient_extractor';
import { ObservationExtractor } from './converters/observation_extractor';
import { ConditionExtractor } from './converters/condition_extractor';
import { ImmunizationExtractor } from './converters/immunization_extractor';
import { MedicationRequestExtractor } from './converters/medication_request_extractor';
import { ProcedureExtractor } from './converters/procedure_extractor';
import { EncounterExtractor } from './converters/encounter_extractor';
import { DiagnosticReportExtractor } from './converters/diagnostic_report_extractor';
import { AllergyIntoleranceExtractor } from './converters/allergy_intolerance_extractor';
import { ExtractorRegistry } from './converters/extractor_registry';
import { CarePlanExtractor } from './converters/care_plan_extractor';
import { DocumentReferenceExtractor } from './converters/document_reference_extractor';
import { GoalExtractor } from './converters/goal_extractor';
import { ServiceRequestExtractor } from './converters/service_request_extractor';
import { DeviceExtractor } from './converters/device_extractor';
import { MedicationExtractor } from './converters/medication_extractor';
import { MedicationStatementExtractor } from './converters/medication_statement_extractor';
import { OrganizationExtractor } from './converters/organization_extractor';
import { PractitionerExtractor } from './converters/practitioner_extractor';
import { PractitionerRoleExtractor } from './converters/practitioner_role_extractor';
import { LocationExtractor } from './converters/location_extractor';
import { ProvenanceExtractor } from './converters/provenance_extractor';
import { CareTeamExtractor } from './converters/care_team_extractor';
import { CoverageExtractor } from './converters/coverage_extractor';
import { Extractor } from './converters/base_extractor';
import { TResource } from './types/resources/Resource';
import { DomainResourceExtractor } from './converters/domain_resource_extractor';
import { AppointmentExtractor } from './converters/appointment_extractor';
import { MedicationDispenseExtractor } from './converters/medication_dispense_extractor';
import { QuestionnaireResponseExtractor } from './converters/questionnaire_response_extractor';
import { QuestionnaireExtractor } from './converters/questionnaire_extractor';
import { RelatedPersonExtractor } from './converters/related_person_extractor';
import { SpecimenExtractor } from './converters/specimen_extractor';

const extractorMap = {
  AllergyIntolerance: AllergyIntoleranceExtractor,
  Appointment: AppointmentExtractor,
  CarePlan: CarePlanExtractor,
  CareTeam: CareTeamExtractor,
  Condition: ConditionExtractor,
  Coverage: CoverageExtractor,
  Device: DeviceExtractor,
  DiagnosticReport: DiagnosticReportExtractor,
  DocumentReference: DocumentReferenceExtractor,
  DomainResource: DomainResourceExtractor,
  Encounter: EncounterExtractor,
  Goal: GoalExtractor,
  Immunization: ImmunizationExtractor,
  Location: LocationExtractor,
  Medication: MedicationExtractor,
  MedicationDispense: MedicationDispenseExtractor,
  MedicationRequest: MedicationRequestExtractor,
  MedicationStatement: MedicationStatementExtractor,
  Observation: ObservationExtractor,
  Organization: OrganizationExtractor,
  Patient: PatientExtractor,
  Practitioner: PractitionerExtractor,
  PractitionerRole: PractitionerRoleExtractor,
  Procedure: ProcedureExtractor,
  Provenance: ProvenanceExtractor,
  Questionnaire: QuestionnaireExtractor,
  QuestionnaireResponse: QuestionnaireResponseExtractor,
  RelatedPerson: RelatedPersonExtractor,
  ServiceRequest: ServiceRequestExtractor,
  Specimen: SpecimenExtractor
};

// add a register function
// to the ExtractorRegistry class

export class ExtractorRegistrar {
  static register(resourceType: string, ExtractorClass: Extractor<TResource>) {
    if (!ExtractorRegistry.has(resourceType)) {
      ExtractorRegistry.register(resourceType, ExtractorClass);
    }
  }

  static registerAll() {
    for (const [resourceType, ExtractorClass] of Object.entries(extractorMap)) {
      this.register(resourceType, ExtractorClass);
    }
  }
}
