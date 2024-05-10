import { BookCheck } from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlternatingItem } from "~/components/alternatingItem";
import { Title } from "~/components/title";
import { WordItem } from "~/components/wordItem";
import { Layout } from "~/features/layout";
import { db } from "~/server/db";
import { Word, WordDTO } from "~/types/word";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { reverseLang } from "~/utils/lang";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (typeof ctx.params?.id !== "string") {
    return {
      notFound: true,
    };
  }

  const id = parseInt(ctx.params?.id);

  if (!id || typeof id !== "number") {
    return {
      notFound: true,
    };
  }

  const word = await db.word.findUnique({
    where: { id },
    select: {
      id: true,
      word: true,
      language: true,
      remembered: true,
    },
  });
  if (word) {
    return {
      props: {
        word,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

interface WordWithConnected extends Word {
  connected: boolean;
}

const addConnectFieldToWords = (words: Word[], connectedIds: number[]) => {
  //words и connectedIds отсортированы по алфавиту

  const answer: WordWithConnected[] = [];

  for (let i = 0; i < words.length; i++) {
    answer.push({ ...words[i]!, connected: false });
  }

  let i1 = 0;
  let i2 = 0;

  while (words.length > i1 || connectedIds.length > i2) {
    if (words[i1]!.id == connectedIds[i2]!) {
      answer[i1]!.connected = true;
      i2++;
    }
    i1++;
  }

  return answer;
};

export default function WordP({ word }: { word: WordDTO }) {
  const [otherWords, setOtherWords] = useState<WordWithConnected[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const otherLangWords: Word[] = api.word.search.useQuery({
    language: reverseLang(word.language),
  }).data;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const meaningsIds: Word[] = api.word.getMeanings.useQuery({
    id: word.id,
  }).data;

  useEffect(() => {
    if (otherLangWords && meaningsIds) {
      setOtherWords(
        addConnectFieldToWords(
          otherLangWords,
          meaningsIds.map((meaning) => meaning.id),
        ),
      );
    }
  }, [word, otherLangWords, meaningsIds]);

  const [value, setValue] = useState("");

  const { mutate: connectF } = api.word.connect.useMutation();
  const { mutate: disconnectF } = api.word.disconnect.useMutation();

  const { mutate: addWordMutate } = api.word.create.useMutation({
    onSuccess: (data: Word) => {
      connectF({ toID: word.id, fromIDS: [data.id] });
      setOtherWords((state) => [{ ...data, connected: true }, ...state]);
      setValue("");
    },
  });

  const addWord = () => {
    addWordMutate({
      word: value,
      language: reverseLang(word.language),
    });
  };

  const toggleWord = (word2: WordWithConnected) => {
    setOtherWords((state) =>
      state.map((w) =>
        w.id == word2.id ? { ...w, connected: !w.connected } : w,
      ),
    );

    if (word2.connected) {
      disconnectF({ toID: word.id, fromIDS: [word2.id] });
    } else {
      connectF({ toID: word.id, fromIDS: [word2.id] });
    }
  };

  return (
    <Layout page="Words">
      <div className="flex flex-col gap-4">
        <div>
          <Title>{word.word}</Title>
          <div className="flex gap-2 items-center">
            <div>{word.language}</div>
            <div>
              {word.remembered && (
                <div className="text-green">
                  <BookCheck size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>meanings</p>

          {otherWords && (
            <div className="w-fill flex h-[600px] flex-col gap-2 overflow-auto ">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  placeholder="create"
                  className="w-full rounded-[4px] bg-primary-3 p-[6px] focus-visible:outline-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addWord();
                    }
                  }}
                />
                <button className=" px-2" onClick={() => addWord()}>
                  add
                </button>
              </div>
              <div>
                {otherWords.map((word, index) => (
                  <div key={word.id} onClick={() => toggleWord(word)}>
                    <AlternatingItem key={word.id} index={index}>
                      <div className="flex cursor-pointer items-center">
                        <div className="ml-[4px] w-[20px]">
                          <div
                            className={cn(
                              "h-[20px] rounded-[4px] border-[1px] border-primary-3",
                              word.connected ? "bg-primary-1" : "",
                            )}
                          >
                            {" "}
                          </div>
                        </div>
                        <WordItem word={word} />
                      </div>
                    </AlternatingItem>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>{" "}
    </Layout>
  );
}
