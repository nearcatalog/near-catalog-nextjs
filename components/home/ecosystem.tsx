import SectionHeading from "@/components/ui/section-heading";
import EcosystemTabs from "@/components/home/ecosystem/tabs";
import Image from "next/image";
import Mountains from "@/public/assets/images/bg/mountains.webp";

export default function EcosystemSupport() {
  return (
    <section
      id="ecosystem-support"
      className="relative flex w-full flex-col items-center justify-center gap-3"
    >
      <Image
        src={Mountains}
        alt={"Mountains"}
        priority
        placeholder="blur"
        className="absolute left-0 top-0 z-[0] h-full w-full object-cover"
        sizes="100vw"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, 1) ,rgba(0,0,0,0))",
        }}
      />
      <div className="container z-[1] mx-auto flex flex-col items-center justify-center gap-12">
        <SectionHeading
          title="Ecosystem Support"
          description="We are all about supporting our community and the builders of our ecosystem"
        />
        <div className="flex w-full max-w-full flex-col items-center px-4 md:px-8">
          <EcosystemTabs />
        </div>
      </div>
    </section>
  );
}
