"use client";
import Footer from "@/components/navigation/Footer";
import DashboardPublic from "@/components/pageComponents/DashboardPublic";
import NavBar from "@/components/navigation/NavBar";
import DashboardPrivate from "@/components/pageComponents/DashboardPrivate";
import { useContext } from "react";
import { AuthInfo } from "@/context/AuthInfo";
import EmployerDashboard from "@/components/pageComponents/EmployerDashboard";

export default function Home() {
  const { user, role } = useContext(AuthInfo);

  return (
    <main>
      <NavBar />
      <div className=" flex flex-col items-center text-center justify-center">
        {user ? (
          role === "freelancer" ? (
            <DashboardPrivate />
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
