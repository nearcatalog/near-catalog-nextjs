import HomeStats from "@/components/home/stats";
import GradientButton from "@/components/ui/gradient-button";
import HomeImages from "./images";

export default function HomeHero() {
  return (
    <>
      <section className="container relative z-[5] mx-auto my-24 flex flex-col items-center justify-center gap-6 sm:my-32">
        <HomeImages />
        <h1 className="z-[5] hidden text-balance text-center text-7xl font-bold leading-tight text-white sm:block">
          Discover NEAR
          <br />
          Ecosystem Landscape
        </h1>
        <h2 className="z-[5] text-balance text-center text-[2.5rem] font-bold leading-tight text-white sm:hidden">
          Discover NEAR <br /> Landscape
        </h2>
        <HomeStats />
        <GradientButton
          target="_blank"
          href={"https://submit.nearcatalog.xyz/new-project/"}
          className="z-[5]"
        >
          Submit your project
        </GradientButton>
      </section>
    </>
  );
}
