import { FC, ReactNode } from "react";
import { pageTitleT } from "~/types/page";
import { Nav } from "./nav";
import { ContentWidthLimiter } from "~/components/layout/contentWidthLimiter";

export const Layout: FC<{ children?: ReactNode; page?: pageTitleT }> = ({
  children,
  page,
}) => {
  return (
    <div className="flex h-[100svh] w-[100svw] flex-col bg-primary-5">
      <div className=" h-[50px] w-full border-b-[1px] border-primary-3 bg-primary-4  ">
        <ContentWidthLimiter>
          <div className="p-6">
            <Nav page={page} />
          </div>
        </ContentWidthLimiter>
      </div>
      <div className="scroll-hide w-auto grow overflow-auto">
        <ContentWidthLimiter>
          <div className="p-6"> {children} </div>
        </ContentWidthLimiter>
      </div>
    </div>
  );
};


