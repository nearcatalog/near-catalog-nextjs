import SectionHeading from "@/components/ui/section-heading";
import SearchImage from "@/public/assets/images/search.webp";
import Search from "@/components/search";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";
import TagsModal from "@/components/modals/tags";
import SearchProjects from "@/components/home/searchProjects";
import ImageWithFallback from "../ImageWithFallback";

export default async function Discover() {
  const projects = await fetchAllProjects();
  const projectsLength = Object.keys(projects).length;

  if (!projects) {
    return <div>Error fetching projects</div>;
  }

  const projectArray: ProjectRecord[] = Object.values(projects);
  
  let tags: Record<string, string>[] = projectArray
    .map((project: ProjectRecord) => project.profile.tags)
    .flat();

  let uniqueTags: Record<string, string> = {};

  tags.forEach((tag) => {
    Object.keys(tag).forEach((key) => {
      if (!uniqueTags[key]) {
        uniqueTags[key] = tag[key];
      }
    });
  });

  return (
    <section
      id="all-projects"
      className="container mx-auto my-36 overflow-x-clip px-4"
    >
      <div className="relative flex flex-col items-center pt-24 md:pt-0">
        <SectionHeading
          title="Discover All Projects"
          description={`Explore ${projectsLength}+ active innovative projects building within our vibrant ecosystem`}
        />
        <ImageWithFallback
          className="absolute right-1/2 top-0 z-0 h-[8.8125rem] w-[13.8125rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
          src={SearchImage}
          alt={"Discover All Projects"}
          placeholder="blur"
          width={347}
          height={222}
        />
      </div>
      <div className="z-1 relative my-16">
        <Search tags={uniqueTags} />
        <TagsModal tags={uniqueTags} />
        <SearchProjects />
      </div>
    </section>
  );
}
