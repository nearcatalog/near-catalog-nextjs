import Link from "next/link";

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  className?: string;
  bgColor?: string;
  target?: string;
};

export default function GradientButton({
  children,
  href,
  className,
  bgColor,
  target,
  ...restProps
}: GradientButtonProps) {
  const commonClasses = `${className} w-fit inline-flex items-center shrink-0 justify-center rounded-full bg-gradient-to-r from-[#00EC97] via-[#17D9D4] to-[#9747FF] p-[.0625rem] font-semibold text-white active:from-[#00EC97B2] active:via-[#17D9D4B2] active:to-[#9747FFB2] disabled:cursor-not-allowed`;
  const spanClasses = `relative ${bgColor ? `bg-[${bgColor}]` : "bg-black"} z-[1] bg-hover-gradient bg-click-gradient flex items-center justify-center rounded-full px-2 py-2 lg:px-4 lg:py-2 text-white active:text-[#ecebe9]`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
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
