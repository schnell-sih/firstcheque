import Footer from "@/components/Footer";
import Dashboard from "@/components/pageCompnents/Dashboard";

export default function Home() {
  return (
    <main>
      <div className=" flex flex-col min-h-screen items-center text-center justify-center">
        <Dashboard />
      </div>
      <Footer />
    </main>
  );
}
