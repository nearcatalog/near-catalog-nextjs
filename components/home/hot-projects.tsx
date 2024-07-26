import Image from "next/image";
import SectionHeading from "../section-heading";
import Project from "../project";
import Fire from "@/public/icons/fire.svg";

async function getHotProjects() {
  const res = await fetch(
    `https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects-by-category?cid=trending`,
  );
  const data = await res.json();
  return data.data;
}

export default async function HotProjects() {
  const projects = await getHotProjects();
  const projectKeys = Object.keys(projects);

  return (
    <div className="container mx-auto mt-20 bg-black">
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
      <div className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-4">
        {projectKeys.map((project) => (
          <Project project={projects[project]} key={project} />
        ))}
      </div>
    </div>
  );
}
