import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import SearchImage from "@/public/assets/search.webp";
import Search from "../search";
import FilteredProjects from "./filtered-projects";
import { ProjectType as Project } from "@/lib/types";

async function getProjects() {
  const res = await fetch(
    "https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects",
  );
  const data = await res.json();
  return data;
}

export default async function Discover() {
  const projects = await getProjects();
  const projectsLength = Object.keys(projects).length;

  if (!projects) {
    return <div>Error fetching projects</div>;
  }

  const projectArray: Project[] = Object.values(projects);
  let tags: string[] = projectArray
    .map((project: Project) => Object.values(project.profile.tags))
    .flat();
  const uniqueTags = Array.from(new Set(tags)).sort();

  return (
    <section
      id="all-projects"
      className="container mx-auto my-36 overflow-x-clip px-4"
    >
      <div className="relative flex flex-col items-center pt-24 md:pt-0">
        <SectionHeading
          title="Discover All Projects"
          description={`Explore ${projectsLength} innovative projects built within our vibrant ecosystem`}
        />
        <Image
          className="absolute right-1/2 top-0 z-0 h-[141px] w-[221px] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[222px] md:w-[347px] md:translate-x-0"
          src={SearchImage}
          alt={"Discover All Projects"}
          width={347}
          height={222}
        />
      </div>
      <div className="z-1 relative my-16">
        <Search tags={uniqueTags} />
        <FilteredProjects />
      </div>
    </section>
  );
}
