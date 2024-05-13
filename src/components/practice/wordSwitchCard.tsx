import { FC, useState } from "react";
import { Lang } from "~/types/word";
import { cn } from "~/utils/cn";
import { reverseLang } from "~/utils/lang";

export const WordSwitchCard: FC<{
  rusWords: string[];
  engWords: string[];
  defaultSide: Lang;
}> = ({ rusWords, engWords, defaultSide }) => {
  const [side, setSide] = useState<Lang>(defaultSide);

  return (
    <div
    onClick={() => setSide(reverseLang(side))}
      className={cn(
        " h-full w-full  rounded  text-white cursor-pointer select-none transition ease-in duration-[200ms]",
        side == "english" ? "bg-eng-2" : "bg-rus-2",
      )}
    >
      <div className={cn("text-[50px] w-full h-full flex items-center justify-center absolute top-0 left-0 flex-col transition   ease-in duration-[200ms]" , side == 'russian' ? '' : 'opacity-0' )}>
        {rusWords.map((word , index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
      <div className={cn("text-[50px] w-full h-full flex items-center justify-center absolute top-0 left-0 flex-col transition  ease-in duration-[200ms]"  , side == 'english' ? '' : 'opacity-0' )}>
        {engWords.map((word , index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </div>
  );
};
