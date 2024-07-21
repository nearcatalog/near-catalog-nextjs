import SectionHeading from "@/components/section-heading";
import EcosystemTabs from "@/components/ecosystem/tabs";

import Image from "next/image";
import EcosystemBg from "@/public/bg/ecosystem-bg.png";

export default function EcosystemSupport() {
  return (
    <div
      id="ecosystem-support"
      className="relative flex w-full flex-col items-center justify-center gap-3"
    >
      <div className="container z-[1] mx-auto flex flex-col items-center justify-center gap-3">
        <SectionHeading
          title="Ecosystem Support"
          description="We are all about supporting our community and the builders of our ecosystem"
        />
        <EcosystemTabs />
      </div>
      <Image
        src={EcosystemBg}
        alt="Ecosystem Background"
        className="pointer-events-none absolute left-0 top-0 z-[0] min-h-[665px] w-screen object-cover"
      />
    </div>
  );
}
