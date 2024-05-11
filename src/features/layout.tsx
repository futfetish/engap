import Link from "next/link";
import { FC, ReactNode } from "react";
import { cn } from "~/utils/cn";

type pageTitleT = "Words" | "Main" | "Practice";

export const Layout: FC<{ children?: ReactNode; page?: pageTitleT }> = ({
  children,
  page,
}) => {
  return (
    <div className="h-[100svh] w-[100svw] bg-primary-5">
      <div className=" h-[50px] w-full border-b-[1px] border-primary-3 bg-primary-4  ">
        <div className=" mx-auto h-full max-w-[1200px] px-6">
          <Nav page={page} />
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] p-6">{children}</div>
    </div>
  );
};

interface pageT {
  title: pageTitleT;
  href: string;
}

const createPage = (title: pageTitleT, href: string) => ({ title, href });

const pages: pageT[] = [createPage("Main", "/"), createPage("Words", "/words") , createPage("Practice" , "/practice")];

const Nav: FC<{ page?: pageTitleT }> = ({ page }) => {
  return (
    <ul className="flex h-full items-center gap-6">
      {pages.map((pageItem, index) => (
        <NavItem
          href={pageItem.href}
          key={index}
          active={pageItem.title === page}
        >
          {pageItem.title}
        </NavItem>
      ))}
    </ul>
  );
};

const NavItem: FC<{ children: string; href: string; active: boolean }> = ({
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
