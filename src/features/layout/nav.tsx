import { FC } from "react";
import { NavItem } from "~/components/layout/navItem";
import { pageT, pageTitleT } from "~/types/page";

const createPage = (title: pageTitleT, href: string) => ({ title, href });

const pages: pageT[] = [createPage("Main", "/"), createPage("Words", "/words") , createPage("Practice" , "/practice")];

export const Nav: FC<{ page?: pageTitleT }> = ({ page }) => {
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
  
  