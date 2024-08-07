"use client";

import GradientButton from "@/components/ui/gradient-button";
import NearLogo from "@/public/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchModalStore } from "@/store/search-modal-store";

type Route = {
  name: string;
  href: string;
};

const routes: Route[] = [
  {
    name: "Ecosystem",
    href: "/#ecosystem-support",
  },
  {
    name: "Trending",
    href: "/#hot-projects",
  },
  {
    name: "Discover",
    href: "/#all-projects",
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
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
  const handleNavLink = async (e: any) => {
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
      onClick={handleNavLink}
      className="rounded-full px-2 py-1 text-center font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1A1A17] focus:bg-[#282828] lg:px-4 lg:py-2"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { setIsOpen: setSearchModalOpen } = useSearchModalStore();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar sticky top-0 z-20 bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-5 md:h-20 md:py-4">
          <Link
            href="/"
            onClick={() => isOpen && toggleDropdown()}
            className="min-w-max flex-1"
          >
            <Image
              src={NearLogo}
              className="h-10 w-24 object-contain md:h-14 md:w-28"
              alt="Near Logo"
              priority={true}
            />
          </Link>
          <div className="mx-auto hidden items-center gap-1 md:flex md:gap-2">
            {routes.map((route) => (
              <NavLink key={route.name} href={route.href}>
                {route.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden min-w-max flex-1 shrink-0 items-center justify-end gap-2 md:flex">
            <GradientButton
              target="_blank"
              href={"https://submit.nearcatalog.xyz/new-project/"}
            >
              Submit your project
            </GradientButton>
            <button
              aria-label="Search"
              onClick={() => setSearchModalOpen(true)}
              className="bg=[#1A1A17] hidden h-10 items-center gap-2 rounded-full border border-gray-400 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-[#2b2d3a] md:flex"
            >
              <i className="bi bi-search flex items-center justify-center text-lg text-white" />
              <span className="hidden lg:block">Search</span>
            </button>
          </div>
          <div className="align-center flex items-center justify-center gap-4 md:hidden">
            <button aria-label="Toggle Menu" onClick={toggleDropdown}>
              {isOpen ? (
                <i className="bi bi-x flex items-center justify-center text-3xl text-white" />
              ) : (
                <i className="bi bi-list flex items-center justify-center text-3xl text-white" />
              )}
            </button>
            <button
              aria-label="Search"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center text-white"
            >
              <i className="bi bi-search flex items-center justify-center text-lg" />
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
            <NavLink key={index} href={route.href} onClick={toggleDropdown}>
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
