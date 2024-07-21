import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
}

const TITLE_MAX_CHARACTERS = 25;
const DESCRIPTION_MAX_CHARACTERS = 63;

export default function Project({ title, description, image }: ProjectProps) {
  return (
    <div className="flex w-full max-w-60 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-black p-4 pt-2">
      <Image
        src={image}
        alt="Project Image"
        className="size-16 rounded-full bg-gray-900 object-cover"
        width={64}
        height={64}
      />
      <h3 className="max-w-full break-words text-center font-medium text-[#FFFFFFE5]">
        {title.length > TITLE_MAX_CHARACTERS
          ? `${title.substring(0, TITLE_MAX_CHARACTERS)}...`
          : title}
      </h3>
      <p className="max-w-full break-words text-center text-xs font-medium text-[#7E7E7E]">
        {description.length > DESCRIPTION_MAX_CHARACTERS
          ? `${description.substring(0, DESCRIPTION_MAX_CHARACTERS)}...`
          : description}
      </p>
    </div>
  );
}
