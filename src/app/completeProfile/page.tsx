"use client";
import Input from "@/components/ui/Input";
import React, { useEffect, useState } from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@/context/AuthInfo";

const CompleteProfile = () => {
  const router = useRouter();
  const { user, role, setRole } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    role: "",
    skills: "",
    age: "",
    gender: "",
    companyName: "",
    website: "",
  });

  useEffect(() => {
    const supabase = createClient();

    const checkProfileCompletion = async () => {
      setIsLoading(true);

      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      if (role) {
        router.push("/");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("profileCompleted")
          .eq("userid", user.id)
          .single();

        if (error) {
          console.error(error);
        } else if (data && data.profileCompleted) {
          console.log("Profile already completed");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileCompletion();
  }, [user, role, router]);

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRoleSelect = (value) => {
    setProfileData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleSubmit = async () => {
    const supabase = createClient();

    if (profileData.role === "freelancer") {
      if (!profileData.skills || !profileData.age || !profileData.gender) {
        alert("Please fill in all required fields");
        return;
      }

      await setFreeLancerData(supabase);
    } else if (profileData.role === "employer") {
      if (!profileData.companyName) {
        alert("Please fill in all required fields");
        return;
      }

      await setEmployerData(supabase);
    }
  };

  const setFreeLancerData = async (supabase) => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const { error } = await supabase
        .from("freelancer")
        .upsert([
          {
            userid: user.id,
            skills: profileData.skills,
            age: profileData.age,
            gender: profileData.gender,
          },
        ])
        .select();

      if (error) {
        console.error(error);
        return;
      }

      await supabase
        .from("user")
        .update({ role: "freelancer", profileCompleted: true })
        .eq("userid", user.id)
        .single();

      setRole("freelancer");
      router.push("/");
    } catch (error) {
      console.error("Error setting freelancer data:", error);
    }
  };

  const setEmployerData = async (supabase) => {
    if (!user?.id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const { error } = await supabase
        .from("employer")
        .upsert([
          {
            id: user.id,
            companyName: profileData.companyName,
            website: profileData.website,
          },
        ])
        .select();

      if (error) {
        console.error(error);
        return;
      }

      await supabase
        .from("user")
        .update({ role: "employer", profileCompleted: true })
        .eq("userid", user.id)
        .single();

      setRole("employer");
      router.push("/");
    } catch (error) {
      console.error("Error setting employer data:", error);
    }
  };

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
      <div className="rounded-2xl border-2 border-black p-8">
        <h1 className="text-4xl font-bold">Complete your profile</h1>
        <div className="flex flex-col mt-8 w-[25rem]">
          <Select
            options={[
              { label: "Employer", value: "employer" },
              { label: "Freelancer", value: "freelancer" },
            ]}
            placeholder="Select your role"
            onSelect={handleRoleSelect}
            className={`${profileData.role ? "mb-4" : ""}`}
          />
          {profileData.role === "freelancer" && (
            <div className="grid grid-rows-2 gap-4">
              <Input
                placeholder="Skills"
                value={profileData.skills}
                onTextChange={(value) => handleInputChange("skills", value)}
              />
              <Input
                placeholder="Age"
                value={profileData.age}
                type="number"
                onTextChange={(value) => handleInputChange("age", value)}
              />
              <Input
                placeholder="Gender"
                value={profileData.gender}
                onTextChange={(value) => handleInputChange("gender", value)}
              />
              <Button onClick={handleSubmit} text="Submit" />
            </div>
          )}
          {profileData.role === "employer" && (
            <div className="grid grid-rows-2 gap-4">
              <Input
                placeholder="Company name"
                value={profileData.companyName}
                onTextChange={(value) =>
                  handleInputChange("companyName", value)
                }
              />
              <Input
                placeholder="Website"
                value={profileData.website}
                onTextChange={(value) => handleInputChange("website", value)}
              />
              <Button onClick={handleSubmit} text="Submit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
