import HomeStats from "@/components/home/stats";
import GradientButton from "@/components/gradient-button";

export default function HomeHero() {
  return (
    <>
      <div className="container relative z-[2] mx-auto my-24 flex flex-col items-center justify-center gap-6 md:my-32">
        <h1 className="hidden text-balance text-center text-7xl font-bold leading-tight text-white md:block">
          Discover NEAR
          <br />
          Ecosystem Landscape
        </h1>
        <h2 className="text-balance text-center text-[40px] font-bold leading-tight text-white md:hidden">
          Discover NEAR <br /> Landscape
        </h2>
        <HomeStats />
        <GradientButton
          target="_blank"
          href={"https://submit.nearcatalog.xyz/new-project/"}
        >
          Submit your project
        </GradientButton>
      </div>
    </>
  );
}
