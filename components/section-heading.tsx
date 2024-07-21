interface SectionHeadingProps {
  title: string;
  description: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h2 className="text-balance text-[32px] font-bold md:text-5xl md:font-medium">
        {title}
      </h2>
      <p className="text-balance text-center text-xs md:text-base">
        {description}
      </p>
    </div>
  );
}
