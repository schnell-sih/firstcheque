"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function SignupFormDemo() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black my-2.5 max-h-[calc(100vh-20px)]">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create a job
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Job Name */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="jobname">Job Name</Label>
          <Input
            id="jobname"
            placeholder="Software Developer"
            type="text"
            className="placeholder:font-light"
          />
        </LabelInputContainer>

        {/* Job Description */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="jobdescription">Job Description</Label>
          <Input
            id="jobdescription"
            placeholder="Enter job description..."
            type="text"
            className="placeholder:font-light"
          />
        </LabelInputContainer>

        {/* Skills Required */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="skills">Skills Required</Label>
          <Input
            id="skills"
            placeholder="E.g., React, Node.js..."
            type="text"
            className="placeholder:font-light"
          />
        </LabelInputContainer>

        {/* State and City Fields */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="state">State</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Input
                  id="state"
                  placeholder={selectedState ? selectedState : "State"}
                  className="cursor-pointer placeholder:font-light"
                  readOnly
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 max-h-44 overflow-y-auto rounded-md bg-white text-black shadow-lg">
                <DropdownMenuLabel>Select a State</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {states.sort().map((state) => (
                  <DropdownMenuItem
                    key={state}
                    onClick={() => setSelectedState(state)}
                  >
                    {state}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="City"
              type="text"
              className="placeholder:font-light"
            />
          </LabelInputContainer>
        </div>

        {/* Range Fields */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="higherValue">Higher Value</Label>
            <Input
              id="higherValue"
              placeholder="100"
              type="text"
              className="placeholder:font-light"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lowerValue">Lower Value</Label>
            <Input
              id="lowerValue"
              placeholder="10"
              type="number"
              className="placeholder:font-light"
            />
          </LabelInputContainer>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
