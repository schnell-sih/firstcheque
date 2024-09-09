import Footer from "@/components/navigation/Footer";
import HeroElement from "@/components/pageComponents/HeroElement";
import NavBar from "@/components/navigation/NavBar";
import Dashboard from "@/components/pageComponents/Dashboard";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className=" flex flex-col items-center text-center justify-center">
        {/* <Dashboard /> */}
        <HeroElement />
      </div>
      <Footer />
    </main>
  );
}
