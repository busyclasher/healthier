export type FeaturePoint = {
  id: string;
  title: string;
  details: string;
};

export type Section = {
  id: string;
  title: string;
  label: string;
  summary: string;
  highlights: FeaturePoint[];
};

export const featureSections: Section[] = [
  {
    id: 'value-based-automation',
    title: 'Value-Based Care Automation',
    label: 'Outcome Engine',
    summary:
      'Captures care signals across clinical systems and wearables, then standardizes them into protocols and performance insights.',
    highlights: [
      {
        id: 'kpi-tracking',
        title: 'Outcome Tracking',
        details:
          'Realtime HbA1c, blood pressure, and adherence telemetry flow through FHIR/HL7 connectors into curated patient timelines.'
      },
      {
        id: 'protocols',
        title: 'Protocol Generation',
        details:
          'Generative AI transforms clinician notes into MOH-aligned care plans, tasks, and escalation alerts.'
      },
      {
        id: 'insights',
        title: 'Performance Insights',
        details:
          'Dashboards expose cohort risk, incentive qualification status, and shared-savings projections for each program.'
      }
    ]
  },
  {
    id: 'claims-assistant',
    title: 'AI Claims Assistant',
    label: 'Documentation',
    summary:
      'Turns patient conversations and device deltas into claims-ready bundles, aligned with payer policies and prior-auth rules.',
    highlights: [
      {
        id: 'conversation-intel',
        title: 'Conversation Intelligence',
        details:
          'Medical-grade ASR, diarization, and entity extraction capture diagnoses, interventions, and adherence evidence in-context.'
      },
      {
        id: 'claims-assembly',
        title: 'Claims Assembly',
        details:
          'FHIR or X12 payloads auto-populate with ICD/CPT/SNOMED mappings, outcome attestations, and supporting attachments.'
      },
      {
        id: 'coverage-assurance',
        title: 'Coverage Assurance',
        details:
          'Rules engine checks payer benefit design, flags missing proofs, and opens provider tasks before submission occurs.'
      }
    ]
  },
  {
    id: 'fintech',
    title: 'FinTech Incentive Layer',
    label: 'Rewards',
    summary:
      'Delivers outcome-based rewards and shared savings instantly, orchestrated through smart contracts or workflow automation.',
    highlights: [
      {
        id: 'hybrid-payments',
        title: 'Hybrid Payment Models',
        details:
          'Combines capitation, outcome bonuses, and shared-savings credits calibrated to chronic care program targets.'
      },
      {
        id: 'smart-disbursement',
        title: 'Smart Disbursement',
        details:
          'Escrows payouts, splits rewards across GP, payer, and patient wellness wallets once zero-knowledge proofs clear.'
      },
      {
        id: 'status-tracking',
        title: 'Settlement Tracking',
        details:
          'Event ledger keeps MAS-ready audit trails of claim status, incentive triggers, and financial reconciliation.'
      }
    ]
  },
  {
    id: 'governance',
    title: 'Governance & Privacy',
    label: 'Compliance',
    summary:
      'Protects sensitive data with privacy-by-design controls that respect MAS regulations and patient consent directives.',
    highlights: [
      {
        id: 'zkp',
        title: 'Zero-Knowledge Proofs',
        details:
          'Sensitive metrics are proven through zk attestations, letting payers validate outcomes without raw PHI exposure.'
      },
      {
        id: 'consent',
        title: 'Consent Management',
        details:
          'Ledgered consent artifacts define which datasets power each workflow, syncing with national health data policies.'
      },
      {
        id: 'ops',
        title: 'Operational Controls',
        details:
          'MAS TRM-aligned monitoring and change management maintain resiliency across ingestion, AI, and settlement domains.'
      }
    ]
  }
];
