"use client";
import Footer from "@/components/navigation/Footer";
import DashboardPublic from "@/components/pageComponents/DashboardPublic";
import NavBar from "@/components/navigation/NavBar";
import FreelancerDashboard from "@/components/pageComponents/FreelancerDashboard";
import { useUser } from "@/context/UserContext";
import EmployerDashboard from "@/components/pageComponents/EmployerDashboard";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const { user } = useUser();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true); // Added loading state
  const supabase = createClient();

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("user")
          .select("role")
          .eq("userid", user.id)
          .single();

        if (error) {
          console.error(error);
        } else if (data) {
          console.log(data);
          setRole(data.role);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user, supabase]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-5xl font-bold">FirstCheque</p>
        <p className="text-2xl mt-2">The gateway to freelancing</p>
      </div>
    );
  }

  return (
    <main>
      <NavBar />
      <div className="flex flex-col items-center text-center justify-center">
        {user ? (
          role === "freelancer" ? (
            <FreelancerDashboard />
          ) : (
            <EmployerDashboard />
          )
        ) : (
          <DashboardPublic />
        )}
      </div>
      <Footer />
    </main>
  );
}
