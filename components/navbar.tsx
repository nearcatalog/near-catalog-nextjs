"use client";

import GradientButton from "@/components/gradient-button";
import Logo from "@/public/Near-landscape.svg";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const handleClick = (e: any) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2); // Remove '/#'
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
      <nav
        className={`navbar sticky top-0 z-20 bg-black/60 backdrop-blur-sm md:z-[20]`}
      >
        <div className="container mx-auto flex h-14 items-center justify-between gap-2 px-2 md:h-20 md:px-5 md:py-4">
          <Link href="/" onClick={() => isOpen && handleClick()}>
            <Image
              src={Logo}
              className="h-10 w-24 object-contain md:h-14 md:w-28"
              alt="Near Logo"
              priority={true}
            />
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {routes.map((route) => (
              <NavLink key={route.name} href={route.href}>
                {route.name}
              </NavLink>
            ))}
          </div>

          <GradientButton
            className="hidden md:block"
            target="_blank"
            href={"https://submit.nearcatalog.xyz/new-project/"}
          >
            Submit your project
          </GradientButton>
          <div className="align-center flex justify-center md:hidden">
            <button aria-label="Toggle Menu" onClick={handleClick}>
              {isOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
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
