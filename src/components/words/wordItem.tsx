import { FC } from "react";
import { WordDTO } from "~/types/word";
import { BookCheck } from "lucide-react";
import { cn } from "~/utils/cn";

export const WordItem: FC<{ word: WordDTO }> = ({
  word,
}) => {
  return (
    <div className="flex h-[30px] w-full items-center gap-[8px] px-[8px] text-primary-2 hover:text-primary-1">
      <div className="grow  overflow-ellipsis whitespace-nowrap">
        {word.word}
      </div>
      <div className={cn(" w-[60px]" , word.language === 'english' ?  'text-eng-1' : 'text-rus-1')}> {word.language} </div>
      <div className=" w-[20px]">
  
        {word.remembered && (
          <div className="text-green">
            <BookCheck  />
          </div>
        )}
      </div>
    </div>
  );
};
