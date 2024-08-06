import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarked Projects",
  description: "Your bookmarked projects",
};

export default function BookmarkedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mt-4 px-4" id="top">
      <div className="container mx-auto my-4 md:my-12">{children}</div>
    </div>
  );
}
