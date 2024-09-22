import React from 'react'
import { useEffect, useState } from "react";
import { useAuthInfo } from "@/context/AuthInfo";
import { createClient } from "@/utils/supabase/client"
import WalletContent from './WalletContent';


interface FreelancerData {
  skills: string;
  age: number;
  gender: string;
}

interface EmployerData {
  companyName: string;
  website: string;
}
const ProfileContent = () => {
    const { user, role ,setRole} = useAuthInfo();
    const [userData, setUserData] = useState<string | null>(null);
    const [freelancerData, setFreelancerData] = useState<FreelancerData | null>(null);
    const [employerData, setEmployerData] = useState<EmployerData | null>(null);    const supabase = createClient();
    useEffect(() => {
      const fetchUserRole = async () => {
        if (!role && user) {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("user")
            .select("role")
            .eq("userid", user.id)
            .single();
  
          if (error) {
            console.error("Error fetching user role:", error);
          } else if (data) {
            setRole(data.role);
          }
        }
      };
  
      fetchUserRole();
    }, [user, role, setRole]);
    useEffect(()=>{
        const fetchProfileData = async () => {
          
          const { data: { user } } = await supabase.auth.getUser();
          if(user){
            const {data,error}=await supabase .from("user").select("name").eq("userid",user.id);
            if (error) {
              console.error('Error fetching user:', error);
            } else{
            setUserData(data?.[0]?.name);
            }
          } 
          if (user && role === "freelancer") {
            const { data: freelancerData,error } = await supabase.from("freelancer")
              .select("skills, age, gender")
              .eq("id", user.id);
              if(!error && freelancerData){
                setFreelancerData(freelancerData[0]);
              }
                
          }
          else if (user && role === "employer") {
              const { data: employerData,error } = await supabase.from("employer")
                .select("companyName, website")
                .eq("id", user.id);
                if(!error && employerData){
                  setEmployerData(employerData[0]);
                }
          }
        };
        fetchProfileData();
    },[supabase,user,role])
    console.log("Role:", role);
    console.log("user:", user);
    return (
      <div>
        {userData && <h1>Welcome {userData}</h1>}
        {user ? (
        role === "freelancer" ? (
          freelancerData ? (
            <div>
              <p>Skills: {freelancerData.skills}</p>
              <p>Age: {freelancerData.age}</p>
              <p>Gender: {freelancerData.gender}</p>
            </div>
          ) : (
            <p>freelancer data</p>  
          )
        ) : role === "employer" ? (
          employerData ? (
            <div>
              <p>Company Name: {employerData.companyName}</p>
              <p>Website: {employerData.website}</p>
            </div>
          ) : (
            <p>employer data</p> 
          )
        ) : (
          <p>error</p>  
        )
        ): (
          <p>No user </p>  
        )}

        <WalletContent/>
      </div>
    );
}

export default ProfileContent;