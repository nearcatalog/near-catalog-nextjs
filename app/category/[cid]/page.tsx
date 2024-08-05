import ProjectCard from "@/components/ui/project-card";
import SectionHeading from "@/components/ui/section-heading";
import { fetchProjectCategory } from "@/lib/near-catalog";
import { ProjectCategory } from "@/lib/types";
import SearchImage from "@/public/assets/images/search.webp";
import Image from "next/image";

interface CategoryPageProps {
  params: {
    cid: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cid } = params;

  if (!cid) {
    return <div>Category ID not found</div>;
  }

  const categoryData: ProjectCategory = await fetchProjectCategory(cid);

  if (!categoryData.cat_title) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/images/error.webp"}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>Sorry, we could not find the category:</h2>
        <p className="text-2xl uppercase">{cid}</p>
      </div>
    );
  }

  return (
    <div className="container relative mx-auto flex flex-col gap-4 px-4 py-12">
      <Image
        className="absolute right-1/2 top-0 z-0 h-[141px] w-[221px] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[222px] md:w-[347px] md:translate-x-0"
        src={SearchImage}
        alt={"Discover All Projects"}
        style={{ userSelect: "none" }}
        width={347}
        height={222}
      />
      <SectionHeading
        title={categoryData.cat_title}
        description={categoryData.cat_description}
      />
      <div className="projects mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.values(categoryData.data).map((project: any) => (
          <ProjectCard key={project.slug} project={project} maxWidth />
        ))}
      </div>
    </div>
  );
}
