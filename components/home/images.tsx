import Image from "next/image";
import Stars from "@/public/assets/images/bg/stars.webp";
import MobileLeft from "@/public/assets/images/bg/dots-left.png";
import MobileRight from "@/public/assets/images/bg/dots-right.png";

export default function HomeImages() {
  return (
    <>
      <Image
        src={Stars}
        alt="Stars"
        sizes="100vw"
        placeholder="blur"
        priority
        className="animate-subtle-bounce pointer-events-none absolute left-0 top-0 z-[2] hidden h-full w-full object-cover sm:block"
      />
      <Image
        src={MobileLeft}
        alt="MobileLeft"
        priority
        placeholder="blur"
        sizes="33vw"
        className="pointer-events-none absolute left-0 top-[15%] z-[-1] w-1/3 object-cover sm:hidden"
      />
      <Image
        src={MobileRight}
        alt="MobileRight"
        priority
        sizes="33vw"
        placeholder="blur"
        className="pointer-events-none absolute right-0 top-[15%] z-[-1] w-1/3 translate-y-1/4 object-cover sm:hidden"
      />
    </>
  );
}
