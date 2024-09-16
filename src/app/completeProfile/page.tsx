"use client";
import Input from "@/components/ui/Input";
import React, { useEffect } from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const CompleteProfile = () => {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session) {
        setUser(data.session.user);
        console.log(data.session.user);
      }
    };

    fetchUser();
  }, [router, supabase]);

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
    <div className="flex flex-col h-screen justify-center items-center text-center bg-black">
      <h1 className="text-4xl font-bold text-white">Complete your profile</h1>
      <div className="p-6 flex flex-col rounded-xl border border-gray-300 bg-white text-black mt-6 shadow-lg w-80">
        <Select
          options={[
            { label: "Employer", value: "employer" },
            { label: "Freelancer", value: "freelancer" },
          ]}
          placeholder="Select your role"
          onSelect={handleRoleSelect}
          className="mb-4"
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
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white"
              text="Submit"
            />
          </div>
        )}

        {profileData.role === "employer" && (
          <div className="grid grid-rows-2 gap-4">
            <Input
              placeholder="Company name"
              value={profileData.companyName}
              onTextChange={(value) => handleInputChange("companyName", value)}
            />
            <Input
              placeholder="Website"
              value={profileData.website}
              onTextChange={(value) => handleInputChange("website", value)}
            />
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white"
              text="Submit"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
