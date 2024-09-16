"use client";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const NavBar = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleSignInClick = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const checkUserProfile = async (user: User) => {
    const { data, error } = await supabase
      .from("user")
      .select("profileCompleted")
      .eq("userid", user.id)
      .single();

    if (error && error.code === "PGRST116") {
      const { error: insertError } = await supabase.from("user").insert([
        {
          userid: user.id,
          name: user.user_metadata.full_name,
          email: user.email,
          role: "",
          profileCompleted: false,
        },
      ]);

      if (insertError) {
        console.error("Error inserting user:", insertError.message);
      }

      router.push("/completeProfile");
    } else if (data) {
      if (!data.profileCompleted) {
        router.push("/completeProfile");
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        const loggedInUser = data.session.user;
        setUser(loggedInUser);
        checkUserProfile(loggedInUser);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  return (
    <div className="flex flex-row z-20 justify-between w-full items-center px-12 py-4">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2">
          <span className="self-center text-xl font-black whitespace-nowrap">
            FirstCheque
          </span>
        </a>
      </div>

      <div>
        <NavLink user={user} />
      </div>

      <div>
        {user ? (
          <Button onClick={handleProfileClick} text="Profile" />
        ) : (
          <Button onClick={handleSignInClick} text="Login" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
