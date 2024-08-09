import SectionHeading from "@/components/ui/section-heading";
import { fetchProjectCategory } from "@/lib/near-catalog";
import { ProjectCategory } from "@/lib/types";
import SearchImage from "@/public/assets/images/search.webp";
import ErrorImage from "@/public/assets/images/error.webp";
import Image from "next/image";
import CategoryProjectsList from "./_components/category-projects-list";

interface CategoryPageProps {
  params: {
    cid: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = params;
  const categoryData: ProjectCategory = await fetchProjectCategory(cid);

  if (!categoryData.cat_title) {
    return {
      title: "Category Not Found",
      description: `Sorry, we could not find the category: ${cid}`,
    };
  }

  return {
    title: `${categoryData.cat_title} Projects`,
    description:
      categoryData.cat_description ||
      `Discover ${categoryData.cat_title} projects`,
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
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          priority
          placeholder="blur"
          height={144}
          sizes="182px"
        />
        <h2>Sorry, we could not find the category:</h2>
        <p className="text-2xl uppercase">{cid}</p>
      </div>
    );
  }

  return (
    <main className="container relative mx-auto px-4 py-12" id="top">
      <Image
        className="absolute right-1/2 top-0 z-0 h-[8.8125rem] w-[13.8125rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
        src={SearchImage}
        alt={"Discover All Projects"}
        style={{ userSelect: "none" }}
        placeholder="blur"
        width={347}
        priority
        height={222}
        sizes="(min-width: 768px) 221px, 347px"
      />
      <div className="projects relative z-[1] flex flex-col gap-4">
        <SectionHeading
          title={categoryData.cat_title}
          description={categoryData.cat_description}
        />
        <CategoryProjectsList projects={categoryData.data} />
      </div>
    </main>
  );
}
