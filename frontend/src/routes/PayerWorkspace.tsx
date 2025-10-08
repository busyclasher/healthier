import { RoleGuardNotice } from '../components/RoleGuardNotice';
import { useAuth } from '../context/AuthContext';
import { useClaimTemplates } from '../hooks/useClaimTemplates';

const fallbackStatus = ['Awaiting Proof', 'Qualified', 'Review Needed'];

export function PayerWorkspace() {
  const { role } = useAuth();
  const { status, data, error, refresh } = useClaimTemplates();

  if (role !== 'payer') {
    return <RoleGuardNotice expectedRole="payer" />;
  }

  return (
    <div className="workspace-grid">
      <section className="panel">
        <div className="panel-header">
          <h2>Program Performance Snapshot</h2>
          <button type="button" onClick={() => void refresh()}>
            Sync
          </button>
        </div>
        {status === 'loading' && <p>Loading performance indicators…</p>}
        {status === 'error' && <div className="inline-alert">{error?.message ?? 'Could not sync data'}</div>}
        {status === 'success' && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Status</th>
                <th>Required Evidence</th>
              </tr>
            </thead>
            <tbody>
              {data.map((template, idx) => (
                <tr key={template.id}>
                  <td>{template.description}</td>
                  <td>
                    <span className="status-badge">{fallbackStatus[idx % fallbackStatus.length]}</span>
                  </td>
                  <td>{template.evidence.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <aside className="panel">
        <h2>Governance Queue</h2>
        <p>
          Upcoming work queues will display zero-knowledge proof attestations, anomaly flags, and MAS TRM audit events.
          Connect Postgres tables (`claim_reviews`, `settlement_events`) once the operational datastore is provisioned.
        </p>
        <div className="inline-alert">
          Shared-savings triggers and payment splits will render here after claims are adjudicated and persisted.
        </div>
      </aside>
    </div>
  );
}
