import { SquarePlus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { AlternatingItem } from "~/components/alternatingItem";
import { Title } from "~/components/title";
import { WordItem } from "~/components/wordItem";
import { Layout } from "~/features/layout";
import { Word } from "~/types/word";
import { api } from "~/utils/api";

export default function WordsP() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const engWords: Word[] = api.word.search.useQuery({ language: "eng" }).data;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rusWords: Word[] = api.word.search.useQuery({ language: "rus" }).data;
  return (
    <Layout page="Words">
      <div>
        <Title>
          <div className="flex items-center gap-2 text-primary-1">
            words
            <Link className="" href={"/create"}>
              <SquarePlus />
            </Link>
          </div>
        </Title>

        <div className="flex gap-6">
          <div className="w-[50%]">
            <div className="text-center text-primary-3">russian</div>

            <WordList words={rusWords ?? []} />
          </div>
          <div className="w-[50%]">
            <div className="text-center text-primary-3">english</div>

            <WordList words={engWords ?? []} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const WordList: FC<{ words: Word[] }> = ({ words }) => {
  return (
    <div className="flex h-[600px] w-full flex-col  overflow-auto ">
      {words.map((word, index) => (
        <AlternatingItem key={word.id} index={index}>
          <Link href={"/words/" + word.id}>
            <WordItem word={word} />
          </Link>
        </AlternatingItem>
      ))}
    </div>
  );
};
