"use client";
import SkillRecomendation from "@/components/SkillRecommendations";
import HistoryRecommendations from "@/components/HistoryRecommendation";
import ActiveJob from "@/components/ActiveJob";
 
const page = () => {
  return (
  <div className='bg-white text-stone-800 p-32'>
   <h1 className =" text-4xl text-center font-semibold mb-4"> Discover Jobs </h1>
   <p className =" text-center text-stone-800 mb-16">Explore these job recommendations tailored for your skills.</p>  
    <SkillRecomendation/>
    <HistoryRecommendations/>
    <ActiveJob/>
  </div>
  )
}

export default page