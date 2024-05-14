import { FC, useEffect, useState } from "react";
import { Lang } from "~/types/word";
import { cn } from "~/utils/cn";
import { reverseLang } from "~/utils/lang";

export const WordSwitchCard: FC<{
  rusWords: string[];
  engWords: string[];
  defaultSide: Lang;
}> = ({ rusWords, engWords, defaultSide }) => {
  const [side, setSide] = useState<Lang>(defaultSide);

  useEffect(() => {
    setSide(defaultSide)
  } , [defaultSide  , engWords , rusWords])

  return (
    <div
      onClick={() => setSide(reverseLang(side))}
      className={cn(
        " relative h-full  w-full  cursor-pointer select-none rounded text-white transition duration-[200ms] ease-in",
        side == "english" ? "bg-eng-2" : "bg-rus-2",
      )}
    >
      <div
        className={cn(
          "scroll-hide absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center overflow-auto   text-[50px] transition  duration-[200ms] ease-in",
          side == "russian" ? "opacity-100" : "opacity-0",
        )}
      >
        {rusWords.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
      <div
        className={cn(
          "scroll-hide absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center overflow-auto  text-[50px] transition duration-[200ms] ease-in",
          side == "english" ? "" : "opacity-0",
        )}
      >
        {engWords.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </div>
  );
};
