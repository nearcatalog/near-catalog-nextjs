interface SectionHeadingProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="z-[5] flex flex-col items-center justify-center gap-3 px-2">
      <h2 className="text-balance text-center text-[2rem] font-bold md:text-5xl md:font-medium">
        {title}
      </h2>
      <p className="text-balance text-center text-xs md:text-base">
        {description}
      </p>
    </div>
  );
}
