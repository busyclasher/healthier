import { encountersRepository } from '../data/encounters.repository';
import type { ClaimDraftPayload, EncounterIngestionPayload } from '../types/claims';

export const claimsService = {
  async ingestEncounter(payload: EncounterIngestionPayload) {
    await encountersRepository.saveEncounterSource(payload);
    return { encounterId: payload.encounterId };
  },

  async createDraft(payload: ClaimDraftPayload) {
    return encountersRepository.upsertClaimDraft(payload);
  },

  async listTemplates() {
    return encountersRepository.listTemplates();
  }
};
