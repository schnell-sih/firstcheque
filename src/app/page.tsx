import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/pageComponents/Dashboard";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className=" flex flex-col min-h-screen items-center text-center justify-center">
        <Dashboard />
      </div>
      <Footer />
    </main>
  );
}
