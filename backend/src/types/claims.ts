export type EncounterIngestionPayload = {
  encounterId: string;
  transcript?: string;
  wearableSummary?: Record<string, unknown>;
  labResults?: Record<string, unknown>[];
};

export type ClaimDraftPayload = {
  encounterId: string;
  providerId: string;
  patientId: string;
  outcomeMetrics: Array<{
    code: string;
    value: string | number;
    unit?: string;
  }>;
};

export type ClaimTemplate = {
  id: string;
  description: string;
  evidence: string[];
};

export type ClaimDraft = {
  encounterId: string;
  providerId: string;
  patientId: string;
  codes: Array<{
    system: string;
    code: string;
    description: string;
  }>;
  outcomes: ClaimDraftPayload['outcomeMetrics'];
  attachments: Array<{
    type: string;
    description: string;
    proofId: string;
  }>;
};
