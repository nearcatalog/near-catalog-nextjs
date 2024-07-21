import LeftBlur from "@/public/stats/left-blur.png";
import RightBlur from "@/public/stats/right-blur.png";
import MiddleBlur from "@/public/stats/middle-blur.png";
import Image from "next/image";
import { Info } from "lucide-react";

interface InfoPointProps {
  title: string;
  value: string;
}

function InfoPoint({ title, value }: InfoPointProps) {
  return (
    <div className="flex flex-shrink-0 items-center space-x-2">
      <h3 className="text-2xl font-bold md:min-w-fit md:text-3xl">{value}</h3>
      <p className="max-w-20 text-balance text-[10px] font-extrabold md:text-xs">
        {title}
      </p>
    </div>
  );
}

export default function HomeStats() {
  return (
    <>
      <div className="relative hidden h-16 max-w-3xl items-center justify-center overflow-clip rounded-full bg-[#17D9D4] px-10 py-4 md:flex">
        <div className="z-[2] flex max-w-fit gap-2 text-black">
          <InfoPoint value="568" title="Projects Launched" />
          <InfoPoint value="45" title="Projects Being Built" />
          <InfoPoint value="7 mil." title="Monthly Active Users" />
          <InfoPoint value="32 mil." title="Total Value Locked" />
        </div>
        <Image
          className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2"
          src={LeftBlur}
          alt="Left Blur"
        />
        <Image
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
          src={MiddleBlur}
          alt="Middle Blur"
        />
        <Image
          className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2"
          src={RightBlur}
          alt="Right Blur"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-black md:hidden">
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
