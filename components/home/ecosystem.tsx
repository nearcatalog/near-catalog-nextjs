"use client";

import SectionHeading from "@/components/section-heading";
import EcosystemTabs from "@/components/home/ecosystem/tabs";
import EcosystemProjects from "@/components/home/ecosystem/projects";

import UserGroup from "@/components/icons/user-group";
import Cubes from "@/components/icons/cubes";
import Location from "@/components/icons/location";

import { useState } from "react";

const tabsData = [
  {
    title: "Accelerate Your Growth",
    icon: Cubes,
    projects: ["potlock", "meme-cooking", "near-scope", "mintbase", "spin"],
  },
  {
    title: "Explore DAO Support",
    icon: UserGroup,
    projects: ["build-dao", "race-of-sloths", "reclaim-protocol", "exabits"],
  },
  {
    title: "Connect with Your Local Tribe",
    icon: Location,
    projects: ["hyperbolic", "ringfence", "pond", "nillion", "nevermined"],
  },
];

export default function EcosystemSupport() {
  const [selectedTab, setSelectedTab] = useState(0);

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
          <EcosystemTabs
            tabsData={tabsData}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <EcosystemProjects projects={tabsData[selectedTab].projects} />
        </div>
      </div>
    </div>
  );
}
