import LeftBlur from "@/public/assets/images/stats/left-blur.png";
import RightBlur from "@/public/assets/images/stats/right-blur.png";
import MiddleBlur from "@/public/assets/images/stats/middle-blur.png";
import Image from "next/image";

interface InfoPointProps {
  title: string;
  value: string;
}

function InfoPoint({ title, value }: InfoPointProps) {
  return (
    <div className="flex flex-shrink-0 items-center space-x-2">
      <h2 className="text-2xl font-bold md:min-w-fit md:text-3xl">{value}</h2>
      <p className="max-w-20 text-balance text-[.625rem] font-extrabold md:text-xs">
        {title}
      </p>
    </div>
  );
}

export default function HomeStats() {
  return (
    <>
      <div className="relative z-[5] hidden h-16 max-w-3xl items-center justify-center overflow-clip rounded-full bg-[#17D9D4] px-10 py-4 md:flex">
        <div className="z-[2] flex max-w-fit gap-2 text-black">
          <InfoPoint value="568" title="Projects Launched" />
          <InfoPoint value="45" title="Projects Being Built" />
          <InfoPoint value="7 mil." title="Monthly Active Users" />
          <InfoPoint value="32 mil." title="Total Value Locked" />
        </div>
        <Image
          className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2"
          src={LeftBlur}
          placeholder="blur"
          alt="Left Blur"
        />
        <Image
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
          src={MiddleBlur}
          alt="Middle Blur"
          placeholder="blur"
        />
        <Image
          className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2"
          src={RightBlur}
          alt="Right Blur"
          placeholder="blur"
        />
      </div>
      <div className="z-[5] flex flex-col items-center justify-center gap-2 text-black md:hidden">
        <div className="flex flex-wrap items-center justify-center rounded-full bg-gradient-to-r from-[#00e7de] to-[#00fda9] px-5 py-3">
          <InfoPoint value="568" title="Projects Launched" />
          <InfoPoint value="45" title="Projects Being Built" />
        </div>
        <div className="flex flex-wrap items-center justify-center rounded-full bg-gradient-to-r from-[#00e7de] to-[#00fda9] px-5 py-3">
          <InfoPoint value="7 mil." title="Monthly Active Users" />
          <InfoPoint value="32 mil." title="Total Value Locked" />
        </div>
      </div>
    </>
  );
}
