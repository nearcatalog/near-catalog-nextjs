import Project from "@/components/project";
import SectionHeading from "@/components/section-heading";
import Image from "next/image";
import SearchImage from "@/public/assets/search.webp";

interface CategoryPageProps {
  params: {
    cid: string;
  };
}

type CatagoryData = {
  cat_title: string;
  cat_description: string;
  cat_slug: string;
  data: {
    [key: string]: {
      slug: string;
      profile: {
        name: string;
        tagline: string;
        image: {
          url: string;
        };
        tags: Record<string, string>;
      };
    };
  };
};

async function getCategoryData(cid: string) {
  const res = await fetch(
    `https://nearcatalog.xyz/wp-json/nearcatalog/v1/projects-by-category?cid=${cid}`,
    { cache: "no-cache" },
  ).catch((error) => {
    throw new Error(error);
  });
  const data = await res.json();
  return data;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cid } = params;

  if (!cid) {
    return <div>Category ID not found</div>;
  }

  const categoryData: CatagoryData = await getCategoryData(cid);

  if (!categoryData.cat_title) {
    return (
      <div className="my-32 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={"/assets/error.webp"}
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
        width={347}
        height={222}
      />
      <SectionHeading
        title={categoryData.cat_title}
        description={categoryData.cat_description}
      />
      <div className="mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.values(categoryData.data).map((project: any) => (
          <Project key={project.slug} project={project} maxWidth />
        ))}
      </div>
    </div>
  );
}
