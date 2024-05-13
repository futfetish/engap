import { FC,  InputHTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export const MyInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input {...props} className={cn("text-primary-1 w-full rounded-[4px] bg-primary-3 p-[6px] focus-visible:outline-0" , className ?? '' )}/>
  );
};
