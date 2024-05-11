import { FC, ReactNode } from "react";

export const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="text-3xl">{children}</div>;
};
