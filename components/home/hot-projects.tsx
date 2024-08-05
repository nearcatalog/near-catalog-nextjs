import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import Fire from "@/components/icons/fire";
import ScrollableProjects from "@/components/home/hot-projects/scrollable-projects";
import { fetchHotProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";

export default async function HotProjects() {
  const projects: Record<ProjectId, ProjectRecord> = await fetchHotProjects();

  return (
    <>
      <section id="hot-projects" className="container mx-auto mt-20 bg-black">
        <SectionHeading
          title={
            <div className="flex items-center justify-center gap-4">
              {/* <Image src={Fire} alt="Github" width={42} height={42} /> */}
              <Fire />
              <h3>Hot Projects</h3>
              <Fire />
              {/* <Image src={Fire} alt="Github" width={42} height={42} /> */}
            </div>
          }
          description="Take a look at the hottest projects in our ecosystem based on usage and transactions"
        />
      </section>
      <div className="max-w-full">
        <ScrollableProjects projects={projects} />
      </div>
    </>
  );
}
