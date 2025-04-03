"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useAuthInfo } from "@/context/AuthInfo";
import Button from "@/components/ui/Button";

type ProfileFormData = {
  name: string;
  skills?: string;
  age?: number | "";
  gender?: string;
  companyName?: string;
  website?: string;
};

const EditProfilePage = () => {
  const router = useRouter();
  const { user, role } = useAuthInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    skills: "",
    age: "",
    gender: "",
    companyName: "",
    website: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [hasExistingRoleData, setHasExistingRoleData] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      const supabase = createClient();
      try {
        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("*")
          .eq("userid", user.id)
          .single();

        if (userError) throw userError;

        let roleSpecificData = {};

        // Fetch role-specific data
        if (role === "freelancer") {
          const { data: freelancerData, error } = await supabase
            .from("freelancer")
            .select("*")
            .eq("userid", user.id)
            .single();

          if (!error && freelancerData) {
            setHasExistingRoleData(true);
            roleSpecificData = {
              skills: freelancerData.skills || "",
              age: freelancerData.age || "",
              gender: freelancerData.gender || "",
            };
          }
        } else if (role === "employer") {
          const { data: employerData, error } = await supabase
            .from("employer")
            .select("*")
            .eq("userid", user.id)
            .single();

          if (!error && employerData) {
            setHasExistingRoleData(true);
            roleSpecificData = {
              companyName: employerData.companyName || "",
              website: employerData.website || "",
            };
          }
        }

        // Set form data with profile information
        setFormData({
          name: userData?.name || user.email?.split("@")[0] || "",
          ...roleSpecificData,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setMessage({
          text: "Failed to load profile data",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, role]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    if (!user?.id) {
      setMessage({
        text: "You must be logged in to update your profile",
        type: "error",
      });
      setIsSaving(false);
      return;
    }

    try {
      const supabase = createClient();

      // Update user table (name)
      const { error: userError } = await supabase
        .from("user")
        .update({ name: formData.name })
        .eq("userid", user.id);

      if (userError) throw userError;

      // Update role-specific tables
      if (role === "freelancer") {
        // Check if we need to insert or update
        if (hasExistingRoleData) {
          // Update existing record
          const { error: freelancerError } = await supabase
            .from("freelancer")
            .update({
              skills: formData.skills,
              age: formData.age === "" ? null : formData.age,
              gender: formData.gender,
            })
            .eq("userid", user.id);

          if (freelancerError) throw freelancerError;
        } else {
          // Insert new record
          const { error: freelancerError } = await supabase
            .from("freelancer")
            .insert({
              userid: user.id,
              skills: formData.skills,
              age: formData.age === "" ? null : formData.age,
              gender: formData.gender,
            });

          if (freelancerError) throw freelancerError;
        }
      } else if (role === "employer") {
        // Check if we need to insert or update
        if (hasExistingRoleData) {
          // Update existing record
          const { error: employerError } = await supabase
            .from("employer")
            .update({
              companyName: formData.companyName,
              website: formData.website,
            })
            .eq("userid", user.id);

          if (employerError) throw employerError;
        } else {
          // Insert new record
          const { error: employerError } = await supabase
            .from("employer")
            .insert({
              userid: user.id,
              companyName: formData.companyName,
              website: formData.website,
            });

          if (employerError) throw employerError;
        }
      }

      setMessage({
        text: "Profile updated successfully!",
        type: "success",
      });

      // Redirect to profile page after successful update
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
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
    <div className="flex flex-col h-screen justify-center items-center text-center p-4">
      <div className="rounded-2xl border-2 border-black p-8 max-w-md w-full shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-4">
            {/* Common fields for all roles */}
            <div className="text-left">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Freelancer-specific fields */}
            {role === "freelancer" && (
              <>
                <div className="text-left">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age || ""}
                    onChange={handleChange}
                    min="18"
                    max="120"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Employer-specific fields */}
            {role === "employer" && (
              <>
                <div className="text-left">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
              </>
            )}

            <div className="mt-8 space-y-3">
              <Button
                text={isSaving ? "Saving..." : "Save Changes"}
                disabled={isSaving}
                className="w-full transition-colors"
                onClick={() => handleSubmit}
              />
              <Button
                onClick={() => router.push("/profile")}
                text="Cancel"
                className="w-full bg-gray-100 text-black hover:bg-gray-200 transition-colors"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
