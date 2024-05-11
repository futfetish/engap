
import Link from "next/link";
import { FC } from "react";
import { cn } from "~/utils/cn";

export const NavItem: FC<{ children: string; href: string; active: boolean }> = ({
    children,
    href,
    active,
  }) => {
    return (
      <li
        className={cn(
          "relative flex h-full items-center text-primary-2 ",
          active
            ? " after:content-''  after:absolute   after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full after:bg-white"
            : "",
        )}
      >
        <Link
          href={href}
          className={cn("hover:text-primary-1", active ? "text-primary-1" : "")}
        >
          {children}
        </Link>
      </li>
    );
  };
  