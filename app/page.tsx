import HomeHero from "@/components/home/hero";
import HeroImages from "@/components/home/images";

export default function Home() {
  return (
    <main className="relative">
      <div className="container mx-auto flex flex-col items-center">
        <HeroImages />
        <HomeHero />
      </div>
    </main>
  );
}
