import SectionHeading from "@/components/ui/section-heading";
import { lazy } from "react";
// import Bookmarks from "./_components/bookmarks";

const Bookmarks = lazy(() => import("./_components/bookmarks"));

export default function Bookmarked() {
  return (
    <main>
      <SectionHeading
        title="Bookmarked Projects"
        description="Your bookmarked projects"
      />
      <Bookmarks />
    </main>
  );
}
