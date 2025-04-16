'use client';

import { type ReactNode } from 'react';
import { AuthContext } from './auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: Implement actual auth logic
  const user = null;
  const signOut = async () => {};

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
}
