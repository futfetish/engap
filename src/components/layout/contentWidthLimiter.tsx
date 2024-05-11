import { FC, ReactNode } from "react";

export const ContentWidthLimiter: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="mx-auto h-full max-w-[1200px]"> {children} </div>;
  };