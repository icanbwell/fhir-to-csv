// Automated Registration
import { PatientExtractor } from './patient_extractor';
import { ObservationExtractor } from './observation_extractor';
import { ConditionExtractor } from './condition_extractor';
import { ImmunizationExtractor } from './immunization_extractor';
import { MedicationRequestExtractor } from './medication_request_extractor';
import { ProcedureExtractor } from './procedure_extractor';
import { EncounterExtractor } from './encounter_extractor';
import { DiagnosticReportExtractor } from './diagnostic_report_extractor';
import { AllergyIntoleranceExtractor } from './allergy_intolerance_extractor';
import { ExtractorRegistry } from './extractor_registry';
import { CarePlanExtractor } from './care_plan_extractor';
import { DocumentReferenceExtractor } from './document_reference_extractor';
import { GoalExtractor } from './goal_extractor';
import { ServiceRequestExtractor } from './service_request_extractor';
import { DeviceExtractor } from './device_extractor';
import { MedicationExtractor } from './medication_extractor';
import { MedicationStatementExtractor } from './medication_statement_extractor';
import { OrganizationExtractor } from './organization_extractor';
import { PractitionerExtractor } from './practitioner_extractor';
import { PractitionerRoleExtractor } from './practitioner_role_extractor';
import { LocationExtractor } from './location_extractor';
import { ProvenanceExtractor } from './provenance_extractor';
import { CareTeamExtractor } from './care_team_extractor';
import { CoverageExtractor } from './coverage_extractor';
import { Extractor } from './base_extractor';
import { TResource } from '../types/resources/Resource';
import { DomainResourceExtractor } from './domain_resource_extractor';

const extractorMap = {
  DomainResource: DomainResourceExtractor,
  Patient: PatientExtractor,
  Observation: ObservationExtractor,
  Condition: ConditionExtractor,
  Immunization: ImmunizationExtractor,
  MedicationRequest: MedicationRequestExtractor,
  Procedure: ProcedureExtractor,
  Encounter: EncounterExtractor,
  DiagnosticReport: DiagnosticReportExtractor,
  AllergyIntolerance: AllergyIntoleranceExtractor,
  CarePlan: CarePlanExtractor,
  DocumentReference: DocumentReferenceExtractor,
  Goal: GoalExtractor,
  ServiceRequest: ServiceRequestExtractor,
  Device: DeviceExtractor,
  Medication: MedicationExtractor,
  MedicationStatement: MedicationStatementExtractor,
  Organization: OrganizationExtractor,
  Practitioner: PractitionerExtractor,
  PractitionerRole: PractitionerRoleExtractor,
  Location: LocationExtractor,
  Provenance: ProvenanceExtractor,
  CareTeam: CareTeamExtractor,
  Coverage: CoverageExtractor,
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
