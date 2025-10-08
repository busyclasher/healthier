const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(path: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  listClaimTemplates: () => request<{ templates: unknown[] }>('/claims/templates'),
  draftClaim: (payload: unknown) => request('/claims/draft', 'POST', payload),
  ingestEncounter: (payload: unknown) => request('/claims/ingest', 'POST', payload)
};
