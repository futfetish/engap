import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { WordItem } from "~/components/wordItem";
import { db } from "~/server/db";
import { Word, WordDTO } from "~/types/word";
import { api } from "~/utils/api";
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

  const otherLangWords = api.word.search.useQuery({
    language: reverseLang(word.language),
  }).data;

  const meaningsIds = api.word.getMeanings.useQuery({ id: word.id }).data

  useEffect(() => {
    if (otherLangWords && meaningsIds) {
      setOtherWords(addConnectFieldToWords(otherLangWords, meaningsIds.map((meaning) => meaning.id )));
    }
  }, [word, otherLangWords, meaningsIds]);

  const [value, setValue] = useState("");

  const { mutate: connectF } = api.word.connect.useMutation();
  const { mutate: disconnectF } = api.word.disconnect.useMutation();

  const { mutate: addWordMutate } = api.word.create.useMutation({
    onSuccess: (data) => {
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
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-[35px]">{word.word}</div>
        <div className="flex gap-2">
          <div>{word.language}</div>
          <div>{word.remembered ? "r-d" : ""}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>meanings</p>

        {otherWords && (
          <div className="w-fill flex h-[600px] flex-col gap-2 overflow-auto bg-orange-200 p-2">
            <div className="w-full bg-orange-400 p-2">
              <p>create </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  className="w-full bg-orange-300"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addWord();
                    }
                  }}
                />
                <button
                  className="bg-orange-500 px-2 hover:bg-orange-600"
                  onClick={() => addWord()}
                >
                  add
                </button>
              </div>
            </div>
            {otherWords.map((word) => (
              <div key={word.id} onClick={() => toggleWord(word)}>
                <WordItem word={word} active={word.connected} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
