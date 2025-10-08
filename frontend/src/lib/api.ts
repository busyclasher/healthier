const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ClaimTemplate = {
  id: string;
  description: string;
  evidence: string[];
};

export type DraftClaimRequest = {
  encounterId: string;
  providerId: string;
  patientId: string;
  outcomeMetrics: Array<{
    code: string;
    value: string | number;
    unit?: string;
  }>;
};

export type DraftClaimResponse = {
  status: 'draft';
  claim: {
    encounterId: string;
    providerId: string;
    patientId: string;
    codes: Array<{
      system: string;
      code: string;
      description: string;
    }>;
    outcomes: DraftClaimRequest['outcomeMetrics'];
    attachments: Array<{
      type: string;
      description: string;
      proofId: string;
    }>;
  };
};

async function request<T>(path: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  listClaimTemplates: () => request<{ templates: ClaimTemplate[] }>('/claims/templates'),
  draftClaim: (payload: DraftClaimRequest) => request<DraftClaimResponse>('/claims/draft', 'POST', payload),
  ingestEncounter: (payload: unknown) => request('/claims/ingest', 'POST', payload)
};
