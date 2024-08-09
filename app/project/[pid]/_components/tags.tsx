import Link from "next/link";

export default function Tags({ tags }: { tags: Record<string, string> }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.keys(tags).map((key, index) => (
        <Link
          href={`/category/${key}#top`}
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={index}
        >
          {tags[key]}
        </Link>
      ))}
    </div>
  );
}
