import Image from "next/image";
import Stars from "@/public/bg/bg-stars.png";
import MobileLeft from "@/public/bg/mobile-left.png";
import MobileRight from "@/public/bg/mobile-right.png";

export default function HomeImages() {
  return (
    <>
      <Image
        src={Stars}
        alt="Stars"
        className="absolute left-0 top-0 z-[1] hidden h-full w-full object-cover sm:block"
      />
      <Image
        src={MobileLeft}
        alt="MobileLeft"
        className="absolute left-0 top-[15%] z-[2] w-1/3 object-cover sm:hidden"
      />
      <Image
        src={MobileRight}
        alt="MobileRight"
        className="absolute right-0 top-[15%] z-[2] w-1/3 translate-y-1/4 object-cover sm:hidden"
      />
    </>
  );
}
