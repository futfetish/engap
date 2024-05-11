import { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "~/utils/cn";



export const Card : FC<HTMLAttributes<HTMLDivElement> > = ({children , className , ...props}) => {
    return <div {...props} className={cn(  "bg-primary-4 p-2 rounded-[10px] " , className?  className : "")}>
        {children}
    </div>
}