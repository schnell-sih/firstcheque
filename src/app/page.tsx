"use client";
import Footer from "@/components/navigation/Footer";
import DashboardPublic from "@/components/pageComponents/DashboardPublic";
import NavBar from "@/components/navigation/NavBar";
import FreelancerDashboard from "@/components/pageComponents/FreelancerDashboard";
import { useUser } from "@/context/UserContext";
import EmployerDashboard from "@/components/pageComponents/EmployerDashboard";

export default function Home() {
  const { user, role, loading } = useUser();

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
