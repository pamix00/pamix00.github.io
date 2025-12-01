import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <div className ="relative w-full h-screen">
      <ParticlesBackground />
      <main className="relative z-10">
        <h1>Welcome</h1>
      </main>
    </div>

  );
}
