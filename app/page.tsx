import HomeHero from "@/components/home/hero";
import HomeStats from "@/components/home/stats";
import GradientButton from "@/components/gradient-button";

export default function Home() {
  return (
    <main className="container relative mx-auto flex flex-col px-2 md:px-5 md:py-4">
      <HomeHero />
      <HomeStats />
      <GradientButton>Submit your project</GradientButton>
    </main>
  );
}
