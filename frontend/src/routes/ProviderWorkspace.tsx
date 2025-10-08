import { useState } from 'react';

import { ClaimTemplatesList } from '../components/ClaimTemplatesList';
import { RoleGuardNotice } from '../components/RoleGuardNotice';
import { useAuth } from '../context/AuthContext';
import { useClaimTemplates } from '../hooks/useClaimTemplates';
import { api } from '../lib/api';

export function ProviderWorkspace() {
  const { role, organisationId } = useAuth();
  const { status, data, error, refresh } = useClaimTemplates();
  const [submitting, setSubmitting] = useState(false);
  const [draftStatus, setDraftStatus] = useState<string | null>(null);

  if (role !== 'provider') {
    return <RoleGuardNotice expectedRole="provider" />;
  }

  const handleGenerateDraft = async () => {
    setSubmitting(true);
    setDraftStatus(null);
    try {
      const response = await api.draftClaim({
        encounterId: `enc-${Date.now()}`,
        providerId: organisationId ?? 'clinic-001',
        patientId: 'patient-123',
        outcomeMetrics: [
          { code: 'hba1c', value: 6.4, unit: '%' },
          { code: 'bp_systolic', value: 118, unit: 'mmHg' }
        ]
      });

      setDraftStatus(`Draft prepared with ${response.claim.codes.length} coding artefacts.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to generate claim draft';
      setDraftStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="workspace-grid">
      <section className="panel">
        <div className="panel-header">
          <h2>Active Value-Based Program Templates</h2>
          <button type="button" onClick={() => void refresh()}>
            Refresh
          </button>
        </div>
        {status === 'loading' && <p>Loading templates…</p>}
        {status === 'error' && <div className="inline-alert">{error?.message ?? 'Failed to load templates'}</div>}
        {status === 'success' && <ClaimTemplatesList templates={data} />}
      </section>
      <aside className="panel">
        <div className="panel-header">
          <h2>Generate Claims Draft</h2>
        </div>
        <p>
          Kick off the AI documentation pipeline for a recent encounter. The backend stores draft payloads in Postgres
          (JSONB) when configured, or falls back to in-memory storage during discovery.
        </p>
        <button type="button" onClick={() => void handleGenerateDraft()} disabled={submitting}>
          {submitting ? 'Generating...' : 'Create Draft'}
        </button>
        {draftStatus && <div className="inline-alert">{draftStatus}</div>}
      </aside>
    </div>
  );
}
