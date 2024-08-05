"use client";

import GradientButton from "@/components/ui/gradient-button";
import NearLogo from "@/public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Route = {
  name: string;
  href: string;
};

const routes: Route[] = [
  {
    name: "Ecosystem Support",
    href: "/#ecosystem-support",
  },
  {
    name: "Hot Projects",
    href: "/#hot-projects",
  },
  {
    name: "Discover All Projects",
    href: "/#all-projects",
  },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = async (e: any) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove '/#'

      if (pathname !== "/") {
        await router.push("/#");
      }

      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        const navbar: HTMLElement | null = document.querySelector(".navbar");

        if (targetElement && navbar) {
          const navbarHeight = navbar.offsetHeight;
          const offsetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 500);
    }
    if (onClick) onClick();
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className="rounded-full px-4 py-2 text-center font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1A1A17] focus:bg-[#282828]"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar sticky top-0 z-20 bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center justify-between gap-2 px-5 py-2 md:h-20 md:py-4">
          <Link
            href="/"
            onClick={() => isOpen && handleClick()}
            className="min-w-max flex-1"
          >
            <Image
              src={NearLogo}
              className="h-10 w-24 object-contain md:h-14 md:w-28"
              alt="Near Logo"
              priority={true}
            />
          </Link>
          <div className="mx-auto hidden items-center gap-2 md:flex">
            {routes.map((route) => (
              <NavLink key={route.name} href={route.href}>
                {route.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden min-w-max flex-1 shrink-0 justify-end md:flex">
            <GradientButton
              target="_blank"
              href={"https://submit.nearcatalog.xyz/new-project/"}
            >
              Submit your project
            </GradientButton>
          </div>
          <div className="align-center flex justify-center md:hidden">
            <button aria-label="Toggle Menu" onClick={handleClick}>
              {isOpen ? (
                <i className="bi bi-x text-2xl text-white" />
              ) : (
                <i className="bi bi-list text-xl text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed ${isOpen ? "max-h-screen" : "invisible max-h-0"} left-0 top-0 z-10 h-screen w-full overflow-y-auto bg-black transition-all duration-300 ease-out md:hidden`}
      >
        <div
          className={`mt-14 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"} m-4 flex flex-col items-center gap-6 transition-all duration-300 ease-in-out`}
        >
          {routes.map((route, index) => (
            <NavLink key={index} href={route.href} onClick={handleClick}>
              {route.name}
            </NavLink>
          ))}
          <GradientButton
            onClick={() => setIsOpen(false)}
            target="_blank"
            href={"https://submit.nearcatalog.xyz/new-project/"}
          >
            Submit your Project
          </GradientButton>
        </div>
      </div>
    </>
  );
}
