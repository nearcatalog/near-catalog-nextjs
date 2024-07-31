"use client";

import { useState } from "react";

import EcosystemProjects from "@/components/home/ecosystem/projects";

import UserGroup from "@/components/icons/user-group";
import Cubes from "@/components/icons/cubes";
import Location from "@/components/icons/location";

type TabData = {
  title: string;
  icon: React.FC;
  projects: string[];
};

const tabsData: TabData[] = [
  {
    title: "Accelerate Your Growth",
    icon: Cubes,
    projects: [
      "potlock",
      "senderwallet",
      "near-scope",
      "mintbase",
      "spin",
      "build-dao",
      "race-of-sloths",
      "reclaim-protocol",
      "exabits",
    ],
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

export default function EcosystemTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <ul className="flex w-full items-center justify-between gap-4">
        {tabsData.map((tab, index) => (
          <li key={tab.title} onClick={() => setSelectedTab(index)}>
            <button
              className={`${selectedTab === index && "bg-black/80 backdrop-blur-lg"} flex w-full max-w-xl flex-grow basis-0 flex-col items-center gap-4 rounded-t-lg px-4 py-2 transition-all duration-300 ease-in-out hover:bg-black/80 hover:backdrop-blur-sm lg:px-16 lg:py-7 xl:px-28 xl:py-10`}
            >
              <div className="flex w-full grow flex-col items-center justify-center gap-2 lg:flex-row">
                <span className="h-6 w-6 shrink-0">
                  <tab.icon />
                </span>
                <h3 className="text-xs font-medium lg:text-lg">{tab.title}</h3>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <EcosystemProjects projects={tabsData[selectedTab].projects} />
    </>
  );
}
