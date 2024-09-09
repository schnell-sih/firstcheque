import { HistoryData } from "@/data/HistoryData";
import JobCard from "../JobCard";
import React from "react";

const HistoryRecommendations = () => {
  return (
    <div className="my-16 flex flex-col items-left">
      <h1 className="text-3xl text-left font-semibold">
        History Recommendations
      </h1>
      <div className="grid grid-cols-3 gap-8 my-8">
        {HistoryData.map((job) => (
          <JobCard
            key={job.title}
            title={job.title}
            skills={job.skills}
            employer={job.employer}
            description={job.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryRecommendations;
