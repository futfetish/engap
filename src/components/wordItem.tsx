import { FC } from "react";
import { WordDTO } from "~/types/word";
import { cn } from "~/utils/cn";

export const WordItem: FC<{ word: WordDTO , active? : boolean }> = ({ word , active }) => {
    return (
      <div className={cn(" w-full p-2 bg-orange-300 hover:scale-[99%]" , active ? 'bg-orange-400' : '')}>
        <div> {word.word} </div>
        <div className="flex gap-2 text-slate-100">
          <div>{word.language}</div>
          <div>{word.remembered ? "r-d" : ""}</div>
        </div>
      </div>
    );
  };
  