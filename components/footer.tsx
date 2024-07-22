import Link from "next/link";
import GradientButton from "./gradient-button";

import Discord from "@/public/icons/discord.svg";
import Twitter from "@/public/icons/twitter.svg";
import Github from "@/public/icons/github.svg";
import Telegram from "@/public/icons/telegram.svg";
import Subtract from "@/public/icons/subtract.svg";
import Youtube from "@/public/icons/youtube.svg";
import Image from "next/image";

import NearLogo from "@/public/Near-landscape.svg";

export default function Footer() {
  return (
    <footer className="bg-[#1B1F2A] text-[#BEBDBE]">
      <div className="container mx-auto flex flex-col py-14 pl-6 md:py-14 md:pl-0 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row">
          <div className="flex max-w-72 flex-col gap-4">
            <h4 className="text-sm font-bold">Did we miss something?</h4>
            <p className="text-[12px] font-medium">
              Is your project also built on NEAR but you could not find it in
              our Landscape? Submit your project and we will review it shortly.
            </p>
            <GradientButton bgColor="#1B1F2A">
              Submit your project
            </GradientButton>
          </div>
          <div className="flex flex-col justify-end gap-7 pt-8 md:pt-0 lg:pt-0">
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-5 lg:flex-row lg:items-center lg:gap-5">
              <Link href="https://near.org" target="_blank">
                near.org
              </Link>
              <Link href="https://docs.near.org" target="_blank">
                docs.near.org
              </Link>
              <Link href="https://near.foundation" target="_blank">
                near.foundation
              </Link>
            </div>
            <div className="flex gap-5 md:items-center md:justify-end">
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Discord} alt="Discord" width={32} height={32} />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Subtract} alt="Subtract" width={32} height={32} />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Twitter} alt="Twitter" width={32} height={32} />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Github} alt="Github" width={32} height={32} />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Telegram} alt="Telegram" width={32} height={32} />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
              >
                <Image src={Youtube} alt="Youtube" width={32} height={32} />
              </Link>
            </div>
            <div className="flex gap-5 md:items-center md:justify-end lg:items-center lg:justify-end">
              <Link href="#" target="_blank">
                Cookie Policy
              </Link>
              <Link href="#" target="_blank">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-10 md:items-center md:justify-center md:pt-0 lg:pt-0">
          <Link href="#" target="_blank">
            <Image src={NearLogo} alt="Near Logo" />
          </Link>
          <p className="w-60 font-medium md:w-fit md:font-extrabold">
            Built with ❤️ by Banyan, NEAR Balkans and NEAR Catalog 🚀{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
