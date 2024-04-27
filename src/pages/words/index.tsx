import Link from "next/link";
import { FC } from "react";
import { WordItem } from "~/components/wordItem";
import { Word } from "~/types/word";
import { api } from "~/utils/api";

export default function WordsP() {
  const engWords = api.word.search.useQuery({ language: "eng" }).data;
  const rusWords = api.word.search.useQuery({ language: "rus" }).data;
  return (
    <div>
      
      <div className="flex gap-4">
        words
        <Link className="border-[1px] text-center w-[20px]" href={'/create'}> 
        +
        </Link>
      </div>
      <div className="flex gap-6">
        <div className="w-[50%]">
          rus
          <WordList words={rusWords ?? []} />
        </div>
        <div className="w-[50%]">
          eng
          <WordList words={engWords ?? []} />
        </div>
      </div>
    </div>
  );
}

const WordList: FC<{ words: Word[] }> = ({ words }) => {
  return (
    <div className="flex h-[600px] w-full flex-col gap-2 overflow-auto bg-orange-200 p-2">
      {words.map((word) => (
        <Link href={"/words/" + word.id} key={word.id} >
          <WordItem word={word} />
        </Link>
      ))}
    </div>
  );
};
