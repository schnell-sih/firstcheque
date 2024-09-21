"use client";
import localFont from "next/font/local";
import "./globals.css";
import { AuthInfo } from "@/context/AuthInfo";
import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const cygre = localFont({
  src: [
    {
      path: "../fonts/Cygre-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Cygre-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const authInfoValue = useMemo(
    () => ({ user, setUser, role, setRole }),
    [user, role]
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        setUser(data.session.user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="../fonts/Cygre-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <AuthInfo.Provider value={authInfoValue}>
        <body className={`${cygre.className} antialiased`}>{children}</body>
      </AuthInfo.Provider>
    </html>
  );
}
