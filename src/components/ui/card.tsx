import { FC, HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[10px] bg-primary-4 p-2 ",
        className ?? "",
      )}
    >
      {children}
    </div>
  );
};
