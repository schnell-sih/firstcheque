import React from "react";

interface JobProps {
  title: string;
  skills: string;
  employer: string;
  shadow?: boolean;
}

const JobCard = ({ title, skills, employer, shadow }: JobProps) => {
  return (
    <div
      className={`w-72 h-48 border-2 border-black rounded-lg cursor-pointer hover:bg-slate-100 ${
        shadow ? "shadow-2xl" : "shadow-md"
      }`}
    >
      <div className="flex flex-col justify-between p-4 h-full">
        <h1 className="text-2xl font-bold text-start">{title}</h1>
        <div className="text-md font-medium flex justify-between">
          <p>{skills}</p>
          <p>{employer}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
