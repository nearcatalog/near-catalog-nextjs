import Image from "next/image";
import SectionHeading from "../section-heading";
import Fire from "@/public/icons/fire.svg";
import ScrollableProjects from "./hot-projects/scrollable-projects";

async function getHotProjects() {
  const res = await fetch(
    `https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects-by-category?cid=trending`,
  );
  const data = await res.json();
  return data.data;
}

export default async function HotProjects() {
  const projects = await getHotProjects();

  return (
    <>
      <section id="hot-projects" className="container mx-auto mt-20 bg-black">
        <SectionHeading
          title={
            <div className="flex items-center justify-center gap-4">
              <Image src={Fire} alt="Github" width={42} height={42} />
              <h3>Hot Projects</h3>
              <Image src={Fire} alt="Github" width={42} height={42} />
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
