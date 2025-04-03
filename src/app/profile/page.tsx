"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@/context/AuthInfo";
import Button from "@/components/ui/Button";

type ProfileData = {
  email: string;
  name: string;
  role: string;
  skills?: string;
  age?: number;
  gender?: string;
  companyName?: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const { user, role } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      try {
        let data = {};

        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("*")
          .eq("userid", user.id)
          .single();

        if (userError) throw userError;

        if (role === "freelancer") {
          const { data: freelancerData, error } = await supabase
            .from("freelancer")
            .select("*")
            .eq("userid", user.id)
            .single();

          if (error) {
            console.warn("Error fetching freelancer data:", error);
          } else {
            data = freelancerData;
          }
        } else if (role === "employer") {
          const { data: employerData, error } = await supabase
            .from("employer")
            .select("*")
            .eq("userid", user.id)
            .single();

          if (error) {
            console.warn("Error fetching employer data:", error);
          } else {
            data = employerData;
          }
        }

        setProfileData({
          ...data,
          email: user.email,
          name: userData?.name || user.email?.split("@")[0],
          role: userData?.role || role,
        } as ProfileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, role]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">You are not logged in.</h1>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
          text="Login to continue"
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center text-center">
      <div className="rounded-2xl border-2 border-black p-8 max-w-md w-full shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden relative shadow-md">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {profileData?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6">
            {profileData?.name || "User"}
          </h1>

          <div className="bg-gray-100 w-full rounded-xl p-4 mb-6 shadow-inner">
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="font-medium capitalize">{role || "User"}</p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500 text-left mb-1">Email</p>
                <p className="text-left font-medium">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              {role === "freelancer" && (
                <>
                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500 text-left mb-1">
                      Skills
                    </p>
                    <p className="text-left font-medium">
                      {profileData?.skills || "Not specified"}
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500 text-left mb-1">Age</p>
                    <p className="text-left font-medium">
                      {profileData?.age || "Not specified"}
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500 text-left mb-1">
                      Gender
                    </p>
                    <p className="text-left font-medium">
                      {profileData?.gender || "Not specified"}
                    </p>
                  </div>
                </>
              )}

              {role === "employer" && (
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 text-left mb-1">
                    Company
                  </p>
                  <p className="text-left font-medium">
                    {profileData?.companyName || "Not specified"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <Button
                onClick={() => router.push("/edit-profile")}
                text="Edit Profile"
                className="w-full transition-colors"
              />
              <Button
                onClick={() => router.push("/")}
                text="Back to Home"
                className="w-full bg-gray-100 text-black hover:bg-gray-200 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
