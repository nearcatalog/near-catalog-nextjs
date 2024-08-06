import SectionHeading from "@/components/ui/section-heading";
import { Metadata } from "next";
import { lazy } from "react";

const Bookmarks = lazy(() => import("./_components/bookmarks"));

export const metadata: Metadata = {
  title: "Bookmarked Projects",
  description: "Your bookmarked projects",
};

export default function Bookmarked() {
  return (
    <main className="container mx-auto my-4 px-4 lg:my-12">
      <SectionHeading
        title="Bookmarked Projects"
        description="Your bookmarked projects"
      />
      <Bookmarks />
    </main>
  );
}
