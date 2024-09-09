"use client";
import { useState, useEffect, useRef } from "react";

interface FilterOption {
  label: string;
  type: "pay" | "skills" | "location";
}

const filters: FilterOption[] = [
  { label: "Pay", type: "pay" },
  { label: "Skills", type: "skills" },
  { label: "Location", type: "location" },
];

const indianStates = [
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

const skills = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "SQL",
  "AWS",
];

const Chip = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  const [payRange, setPayRange] = useState({ min: "", max: "" });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [activeChips, setActiveChips] = useState<
    { type: string; value: string }[]
  >([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterClick = (filter: FilterOption) => setSelectedFilter(filter);

  const handlePayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "min" | "max"
  ) => {
    setPayRange({ ...payRange, [field]: e.target.value });
  };

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
  };

  const handleStateToggle = (state: string) => {
    const updatedStates = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state];
    setSelectedStates(updatedStates);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const removeChip = (chip: { type: string; value: string }) => {
    if (chip.type === "skills") {
      setSelectedSkills(selectedSkills.filter((s) => s !== chip.value));
    } else if (chip.type === "location") {
      setSelectedStates(selectedStates.filter((s) => s !== chip.value));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Update the activeChips whenever selectedSkills or selectedStates changes
  useEffect(() => {
    const skillChips = selectedSkills.map((skill) => ({
      type: "skills",
      value: skill,
    }));
    const stateChips = selectedStates.map((state) => ({
      type: "location",
      value: state,
    }));
    setActiveChips([...skillChips, ...stateChips]);
  }, [selectedSkills, selectedStates]);

  return (
    <div className="relative inline-block mt-4 z-50">
      {/* Active filter chips */}
      <div className="flex space-x-2 mb-4">
        {activeChips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-full"
          >
            <span>{chip.value}</span>
            <button
              onClick={() => removeChip(chip)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        ))}

        {/* Chip button */}
        <button
          onClick={toggleDropdown}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
        >
          Add Filter +
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 w-60 bg-white shadow-lg rounded-lg border border-gray-200 p-4"
        >
          {selectedFilter ? (
            <div>
              {/* Back button */}
              <button onClick={() => setSelectedFilter(null)} className="mb-4">
                {"< Back"}
              </button>

              {/* Filter content based on selected filter */}
              {selectedFilter.type === "pay" && (
                <div>
                  <label className="block mb-2">Min Pay</label>
                  <input
                    type="number"
                    value={payRange.min}
                    onChange={(e) => handlePayInputChange(e, "min")}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                    placeholder="Enter min pay"
                  />
                  <label className="block mb-2">Max Pay</label>
                  <input
                    type="number"
                    value={payRange.max}
                    onChange={(e) => handlePayInputChange(e, "max")}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                    placeholder="Enter max pay"
                  />
                </div>
              )}

              {selectedFilter.type === "skills" && (
                <div className="max-h-40 overflow-y-scroll">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="mr-2"
                      />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedFilter.type === "location" && (
                <div className="max-h-40 overflow-y-scroll">
                  {indianStates.map((state, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => handleStateToggle(state)}
                        className="mr-2"
                      />
                      <span>{state}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ul className="py-2">
              {filters.map((filter, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterClick(filter)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between rounded-md"
                >
                  {filter.label}
                  <span>{">"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Chip;
