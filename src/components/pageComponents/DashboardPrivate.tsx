"use client";
import SkillRecomendation from "@/components/recommendation/SkillRecommendations";
import HistoryRecommendations from "@/components/recommendation/HistoryRecommendation";

const DashboardPrivate = () => {
  return (
    <div className="bg-white p-32">
      <h1 className="text-6xl text-center font-semibold mb-4">Discover Jobs</h1>
      <p className="text-center mb-16 text-xl">
        Explore these job recommendations tailored for your skills.
      </p>
      <SkillRecomendation />
      <HistoryRecommendations />
    </div>
  );
};

export default DashboardPrivate;
