import React, { memo } from "react";
import Link from "next/link";

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function GradientButton({
  children,
  href,
  className,
  ...restProps
}: GradientButtonProps) {
  const commonClasses = `${className} inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00EC97] via-[#17D9D4] to-[#9747FF] p-[1.5px] font-semibold text-white active:from-[#00EC97B2] active:via-[#17D9D4B2] active:to-[#9747FFB2] disabled:cursor-not-allowed`;
  const spanClasses = `bg-gradient-black bg-hover-gradient bg-click-gradient flex items-center justify-center rounded-full px-4 py-2 text-white active:text-[#ecebe9]`;

  if (href) {
    return (
      <Link
        href={href}
        className={commonClasses}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <span className={spanClasses}>{children}</span>
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...restProps}>
      <span className={spanClasses}>{children}</span>
    </button>
  );
}
