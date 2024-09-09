"use client";
import React, { useState } from "react";
import JobCardDialog from "./JobCardDialog";

interface JobProps {
  title: string;
  skills: string;
  employer: string;
  description?: string;
  shadow?: boolean;
}

const JobCard = ({
  title,
  skills,
  employer,
  description,
  shadow,
}: JobProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => {
    console.log("Dialog close function called"); // Debug log
    setDialogOpen(false);
  };

  return (
    <div
      className={`w-72 h-48 border-2 border-black rounded-lg cursor-pointer hover:bg-slate-100 ${
        shadow ? "shadow-2xl" : "shadow-md"
      }`}
      onClick={openDialog}
    >
      <div className="flex flex-col justify-between p-4 h-full">
        <h1 className="text-2xl font-bold text-start">{title}</h1>
        <div className="text-md font-medium flex justify-between">
          <p>{skills}</p>
          <p>{employer}</p>
        </div>
      </div>
      <JobCardDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={title}
        skills={skills}
        employer={employer}
        description={description}
      />
    </div>
  );
};

export default JobCard;
