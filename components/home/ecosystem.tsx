import SectionHeading from "@/components/section-heading";
import EcosystemTabs from "@/components/home/ecosystem/tabs";

export default function EcosystemSupport() {
  return (
    <div
      id="ecosystem-support"
      className="relative flex w-full flex-col items-center justify-center gap-3 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/bg/ecosystem-bg.webp)",
      }}
    >
      <div className="container z-[1] mx-auto flex flex-col items-center justify-center gap-12">
        <SectionHeading
          title="Ecosystem Support"
          description="We are all about supporting our community and the builders of our ecosystem"
        />
        <div className="flex w-full max-w-full flex-col items-center px-4 md:px-8">
          <EcosystemTabs />
        </div>
      </div>
    </div>
  );
}
