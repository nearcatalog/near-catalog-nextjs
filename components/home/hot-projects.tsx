import { lazy } from "react";
import SectionHeading from "@/components/ui/section-heading";
import Fire from "@/components/icons/fire";
import { fetchHotProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";

const ScrollableProjects = lazy(
  () => import("@/components/home/hot-projects/scrollable-projects"),
);

export default async function HotProjects() {
  const projects: Record<ProjectId, ProjectRecord> = await fetchHotProjects();

  return (
    <>
      <section id="hot-projects" className="container mx-auto mt-20 bg-black">
        <SectionHeading
          title={
            <div className="flex items-center justify-center gap-4">
              <Fire />
              <h3>Trending Projects</h3>
              <Fire />
            </div>
          }
          // description="Take a look at the hottest projects in our ecosystem based on usage and transactions"
          description=""
        />
      </section>
      <div className="max-w-full">
        <ScrollableProjects projects={projects} />
      </div>
    </>
  );
}
