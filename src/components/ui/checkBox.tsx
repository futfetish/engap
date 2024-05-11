import { FC, HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

interface CheckBoxI extends HTMLAttributes<HTMLDivElement> {
    active : boolean
}

export const CheckBox: FC<CheckBoxI> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  className,
  active,
  ...props
}) => {
  return (
    <div
    {...props}
      className={cn(
        "h-[20px] w-[20px] rounded-[4px] border-[1px] border-primary-3",
        active ? "bg-primary-1" : "",
        className ?? ""
      )}
    ></div>
  );
};
