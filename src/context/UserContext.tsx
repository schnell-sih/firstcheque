"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        setUser(data.session.user);
        const userRole = await fetchUserRole(data.session.user.id);
        setRole(userRole);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      const userRole = session?.user ? fetchUserRole(session.user.id) : null;
      setRole(userRole);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const fetchUserRole = async (userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from("user")
      .select("role")
      .eq("userid", userId)
      .single();
    setLoading(false);

    return data?.role;
  };

  return (
    <UserContext.Provider
      value={{ user, role, loading, setUser, setRole, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
