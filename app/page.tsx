import HomeHero from "@/components/home/hero";
import HeroImages from "@/components/home/images";
import EcosystemSupport from "@/components/home/ecosystem";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroImages />
      <HomeHero />
      <EcosystemSupport />
    </main>
  );
}
