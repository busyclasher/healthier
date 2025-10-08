import { useCallback, useEffect, useState } from 'react';

import { api, type ClaimTemplate } from '../lib/api';

type State =
  | { status: 'idle'; data: ClaimTemplate[]; error: null }
  | { status: 'loading'; data: ClaimTemplate[]; error: null }
  | { status: 'success'; data: ClaimTemplate[]; error: null }
  | { status: 'error'; data: ClaimTemplate[]; error: Error };

export function useClaimTemplates() {
  const [state, setState] = useState<State>({ status: 'idle', data: [], error: null });

  const fetchTemplates = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const result = await api.listClaimTemplates();
      setState({ status: 'success', data: result.templates as ClaimTemplate[], error: null });
    } catch (error) {
      setState({
        status: 'error',
        data: [],
        error: error instanceof Error ? error : new Error('Failed to load templates')
      });
    }
  }, []);

  useEffect(() => {
    void fetchTemplates();
  }, [fetchTemplates]);

  return {
    ...state,
    refresh: fetchTemplates
  };
}
