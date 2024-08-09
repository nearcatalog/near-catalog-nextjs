import Link from "next/link";
import GradientButton from "@/components/ui/gradient-button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1B1F2A] px-4 text-[#BEBDBE]">
      <div className="container mx-auto flex flex-col py-14 pl-6 md:py-14 md:pl-0 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row">
          <div className="flex max-w-72 flex-col gap-4">
            <h4 className="text-sm font-bold">Did we miss something?</h4>
            <p className="text-xs font-medium">
              Is your project also built on NEAR but you could not find it in
              our Landscape? Submit your project and we will review it shortly.
            </p>
            <GradientButton
              bgColor="#1B1F2A"
              target="_blank"
              href={"https://submit.nearcatalog.xyz/new-project/"}
            >
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
            <div className="flex flex-wrap gap-5 text-[#34f0e8] md:items-center md:justify-end">
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Discord"
              >
                <i className="bi bi-discord text-[2rem]" />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Chat"
              >
                <i className="bi bi-chat text-[2rem]" />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter-x text-[2rem]" />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Github"
              >
                <i className="bi bi-github text-[2rem]" />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Telegram"
              >
                <i className="bi bi-telegram text-[2rem]" />
              </Link>
              <Link
                className="transition-opacity duration-300 ease-in-out hover:opacity-50"
                href="#"
                target="_blank"
                aria-label="Youtube"
              >
                <i className="bi bi-youtube text-[2rem]" />
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
          <Link
            href="#"
            target="_blank"
            className="text-2xl font-bold text-white"
          >
            📒NEARCatalog
          </Link>
          <p className="max-w-92 font-medium">
            Build by NEAR Catalog, NEAR China, NEAR Banyan, NEAR Balkans and
            Build DAO
          </p>
        </div>
      </div>
    </footer>
  );
}
