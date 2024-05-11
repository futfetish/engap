import { FC, ReactNode } from "react";
import { cn } from "~/utils/cn";

export const AlternatingItem : FC<{index : number , children? : ReactNode}> = ({index,children}) => {
    return <div className={cn(index % 2 == 0 ? "" : "bg-primary-3")}> {children}  </div>
}