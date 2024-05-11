import { HTMLAttributes } from "react";
import { Card } from "./card";
import { cn } from "~/utils/cn";

export interface PickButtonI<T> extends HTMLAttributes<HTMLDivElement> {
    pick: T;
    setPick: (v: T) => void;
    value: T;
  }
  
 export const PickButton = <T,>({
    children,
    className,
    pick,
    setPick,
    value,
    onClick,
    ...props
  }: PickButtonI<T>) => {
    return (
      <Card
        {...props}
        onClick={(e) =>{ setPick(value) ; onClick && onClick(e) }}
        className={cn(
          "flex cursor-pointer justify-center text-primary-2",
          value == pick ? "!bg-primary-3 !text-primary-1" : "",
          className ?? "",
        )}
      >
        {children}
      </Card>
    );
  };
  