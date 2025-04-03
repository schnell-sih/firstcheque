"use client";

import React, { useEffect, useState } from "react";
import JobCard from "../jobCard/JobCard";
import axios from "axios";
import { useAuthInfo } from "@/context/AuthInfo";
import { createClient } from "@/utils/supabase/client";

interface SkillRecommendation {
  id: string;
  match_score: number;
  name: string;
  skills: string;
}

interface SkillRecommendationResponse {
  recommendations: SkillRecommendation[];
  user_skills: string[];
}

const SkillRecommendation = () => {
  const [recommendations, setRecommendations] =
    useState<SkillRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthInfo();

  const getRecommendations = async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const { data } = await supabase
        .from("freelancer")
        .select("skills")
        .eq("userid", user?.id)
        .single();

      if (data?.skills) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/recommendations",
            { skills: data.skills },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          setRecommendations(response.data);
          console.log("API Response:", response.data);
        } catch (err) {
          console.error("Error fetching recommendations:", err);
          setError("Failed to fetch job recommendations. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Failed to fetch profile skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getRecommendations();
    }
  }, [user?.id]);

  return (
    <div className="my-16 flex flex-col items-left">
      <h1 className="text-3xl text-left font-semibold">
        Skill Recommendations
      </h1>

      {error && (
        <div className="p-4 my-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {recommendations?.user_skills && (
        <div className="my-4 justify-center items-center flex flex-col">
          <h2 className="text-xl font-medium">Your Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {recommendations.user_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="my-8 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      )}

      {!loading && recommendations?.recommendations && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {recommendations.recommendations.map((job) => (
            <JobCard
              key={job.id}
              title={job.name}
              skills={job.skills}
              description={"Required skills: " + job.skills}
            />
          ))}
        </div>
      )}

      {!loading && recommendations?.recommendations?.length === 0 && (
        <div className="my-8 p-4 bg-yellow-100 text-yellow-800 rounded-md">
          No job recommendations found for your skills. Try adding more skills
          or different ones.
        </div>
      )}
    </div>
  );
};

export default SkillRecommendation;
