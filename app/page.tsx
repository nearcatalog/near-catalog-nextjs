import HomeHero from "@/components/home/hero";
// import EcosystemSupport from "@/components/home/ecosystem";
import HotProjects from "@/components/home/hot-projects";
import Discover from "@/components/home/discover";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center">
      <HomeHero />
      {/* <EcosystemSupport /> */}
      <HotProjects />
      <Discover />
    </main>
  );
}
