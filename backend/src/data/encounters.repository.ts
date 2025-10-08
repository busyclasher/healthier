import type { Pool } from 'pg';

import { database } from './db';
import type {
  ClaimDraft,
  ClaimDraftPayload,
  ClaimTemplate,
  EncounterIngestionPayload
} from '../types/claims';

const defaultTemplates: ClaimTemplate[] = [
  {
    id: 'diabetes-vbc',
    description: 'Chronic care bundle with HbA1c outcome bonus',
    evidence: ['lab:hba1c', 'adherence:medication', 'note:protocol-compliance']
  },
  {
    id: 'hypertension-vbc',
    description: 'Blood pressure management with shared savings trigger',
    evidence: ['wearable:blood-pressure', 'note:lifestyle-coaching', 'lab:lipid-profile']
  }
];

const memoryStore = {
  encounterSources: new Map<string, EncounterIngestionPayload>(),
  claimDrafts: new Map<string, ClaimDraft>()
};

export class EncountersRepository {
  private pool: Pool | null;

  constructor() {
    this.pool = database.enabled ? database.getPool() : null;
  }

  async saveEncounterSource(payload: EncounterIngestionPayload) {
    if (!this.pool) {
      memoryStore.encounterSources.set(payload.encounterId, payload);
      return;
    }

    await this.pool.query(
      `
        INSERT INTO encounter_sources (encounter_id, payload)
        VALUES ($1, $2::jsonb)
        ON CONFLICT (encounter_id)
        DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()
      `,
      [payload.encounterId, JSON.stringify(payload)]
    );
  }

  async upsertClaimDraft(payload: ClaimDraftPayload): Promise<ClaimDraft> {
    const claimDraft: ClaimDraft = {
      encounterId: payload.encounterId,
      providerId: payload.providerId,
      patientId: payload.patientId,
      codes: [
        { system: 'ICD-10', code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
        { system: 'CPT', code: '99490', description: 'Chronic care management services' }
      ],
      outcomes: payload.outcomeMetrics,
      attachments: [
        {
          type: 'ZKP',
          description: 'Proof of HbA1c reduction >= 1.0',
          proofId: `proof-${payload.encounterId}`
        }
      ]
    };

    if (!this.pool) {
      memoryStore.claimDrafts.set(payload.encounterId, claimDraft);
      return claimDraft;
    }

    await this.pool.query(
      `
        INSERT INTO claim_drafts (encounter_id, provider_id, patient_id, payload)
        VALUES ($1, $2, $3, $4::jsonb)
        ON CONFLICT (encounter_id)
        DO UPDATE SET
          provider_id = EXCLUDED.provider_id,
          patient_id = EXCLUDED.patient_id,
          payload = EXCLUDED.payload,
          updated_at = NOW()
      `,
      [
        claimDraft.encounterId,
        claimDraft.providerId,
        claimDraft.patientId,
        JSON.stringify(claimDraft)
      ]
    );

    return claimDraft;
  }

  async listTemplates(): Promise<ClaimTemplate[]> {
    if (!this.pool) {
      return defaultTemplates;
    }

    try {
      const result = await this.pool.query<{
        id: string;
        description: string;
        evidence: string[] | null;
      }>('SELECT id, description, evidence FROM claim_templates ORDER BY id ASC');

      if (result.rowCount === 0) {
        return defaultTemplates;
      }

      return result.rows.map((row) => ({
        id: row.id,
        description: row.description,
        evidence: row.evidence ?? []
      }));
    } catch (error) {
      console.warn('Falling back to default templates; database query failed', error);
      return defaultTemplates;
    }
  }
}

export const encountersRepository = new EncountersRepository();
