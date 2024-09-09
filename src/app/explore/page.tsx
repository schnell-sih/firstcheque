import CardWithButton from "@/components/ui/CardWithButton";
import Chip from "@/components/ui/FilterChip";
import Footer from "@/components/navigation/Footer";
import NavBar from "@/components/navigation/NavBar";
import SearchBar from "@/components/ui/SearchBar";
import { exploreData } from "@/data/ExploreData";
import React from "react";

const Search = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-start w-[75%] mx-auto">
        <h1 className="text-[5rem] font-bold mt-24">Explore</h1>
        <SearchBar />
        <Chip />
      </div>
      <div className="flex flex-row m-16 w-[75%] mx-auto justify-between">
        {exploreData.map((data, index) => (
          <CardWithButton
            key={index}
            title={data.title}
            description={data.description}
            imageUrl={data.imageUrl}
            href={data.href}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
