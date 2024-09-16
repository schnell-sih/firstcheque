"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface UserInfo {
  userid: string;
  name: string;
  email: string;
  role: string;
  profileCompleted: boolean;
}

interface UserContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  userInfo: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        setUser(data.session.user);
        setLoading(false);

        const fetchedUserInfo = await fetchUserInfo(data.session.user.id);
        setUserInfo(fetchedUserInfo);
        setRole(fetchedUserInfo.role);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const fetchedUserInfo = await fetchUserInfo(session.user.id);
        setUserInfo(fetchedUserInfo);
        setRole(fetchedUserInfo.role);
      } else {
        setUserInfo(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const fetchUserInfo = async (userId: string): Promise<UserInfo> => {
    const { data, error } = await supabase
      .from("user")
      .select("userid, name, email, role, profileCompleted")
      .eq("userid", userId)
      .single();

    if (error) {
      console.error("Error fetching user info:", error);
      setLoading(false);
      return null;
    }
    setLoading(false);
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        loading,
        userInfo,
        setUser,
        setRole,
        setLoading,
        setUserInfo,
      }}
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
