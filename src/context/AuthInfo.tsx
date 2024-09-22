import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

interface AuthInfoContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
}

export const AuthInfo = createContext<AuthInfoContextType | undefined>(
  undefined
);

export const AuthInfoProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const authInfoValue = useMemo(
    () => ({ user, setUser, role, setRole }),
    [user, role]
  );

  return (
    <AuthInfo.Provider value={authInfoValue}>{children}</AuthInfo.Provider>
  );
};

export const useAuthInfo = () => {
  const context = useContext(AuthInfo);
  if (!context) {
    throw new Error("useAuthInfo must be used within an AuthInfoProvider");
  }
  return context;
};
