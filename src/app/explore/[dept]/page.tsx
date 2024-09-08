import NavBar from "@/components/NavBar";

export default function Page({ params }: { params: { dept: string } }) {
  return (
    <main>
      <NavBar />
      <h1>{params.dept}</h1>
    </main>
  );
}
