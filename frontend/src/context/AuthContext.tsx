import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type UserRole = 'guest' | 'provider' | 'payer';

type AuthContextValue = {
  role: UserRole;
  loginAs(role: Exclude<UserRole, 'guest'>, organisationId?: string): void;
  logout(): void;
  organisationId: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest');
  const [organisationId, setOrganisationId] = useState<string | null>(null);

  const loginAs = useCallback((nextRole: Exclude<UserRole, 'guest'>, nextOrganisationId?: string) => {
    setRole(nextRole);
    setOrganisationId(nextOrganisationId ?? (nextRole === 'provider' ? 'clinic-001' : 'payer-001'));
  }, []);

  const logout = useCallback(() => {
    setRole('guest');
    setOrganisationId(null);
  }, []);

  const value = useMemo(
    () => ({
      role,
      organisationId,
      loginAs,
      logout
    }),
    [role, organisationId, loginAs, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
