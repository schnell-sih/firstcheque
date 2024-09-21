"use client";
import Input from "@/components/ui/Input";
import React, { useContext, useEffect } from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { AuthInfo } from "@/context/AuthInfo";

const CompleteProfile = () => {
  const supabase = createClient();
  const router = useRouter();
  const { user, setUser, role, setRole } = useContext(AuthInfo);

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

  if (role) {
    router.push("/");
  }

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("user")
          .select("profileCompleted")
          .eq("userid", user.id)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        if (data && data.profileCompleted) {
          console.log("Profile already completed");
          router.push("/");
        }
      }
    };

    checkProfileCompletion();
  }, [user, router, supabase]);

  const setFreeLancerData = async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from("freelancer")
        .upsert([
          {
            id: user.id,
            skills: profileData.skills,
            age: profileData.age,
            gender: profileData.gender,
          },
        ])
        .select();

      setRole("freelancer");

      const { data2, error2 } = await supabase
        .from("user")
        .update({ role: "freelancer", profileCompleted: true })
        .eq("userid", user.id)
        .single();

      if (error || error2) {
        console.log(error || error2);
      }

      if (data) {
        console.log(data);
        router.push("/");
      }
    } else {
      console.error("User ID is not available.");
    }
  };

  const setEmployerData = async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from("employer")
        .upsert([
          {
            id: user.id,
            companyName: profileData.companyName,
            website: profileData.website,
          },
        ])
        .select();

      setRole("employer");

      const { data2, error2 } = await supabase
        .from("user")
        .update({ role: "employer", profileCompleted: true })
        .eq("userid", user.id)
        .single();

      if (error || error2) {
        console.log(error || error2);
      }

      if (data) {
        console.log(data);
        router.push("/");
      }
    } else {
      console.error("User ID is not available.");
    }
  };

  const [profileData, setProfileData] = React.useState({
    role: "",
    skills: "",
    age: "",
    gender: "",
    companyName: "",
    website: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRoleSelect = (value: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleSubmit = () => {
    if (profileData.role === "freelancer") {
      setFreeLancerData();
    } else if (profileData.role === "employer") {
      setEmployerData();
    }
  };

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
