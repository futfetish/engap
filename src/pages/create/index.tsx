import { useRouter } from "next/router";
import { useState } from "react";
import { Title } from "~/components/title";
import { Layout } from "~/features/layout";
import { Lang, Word } from "~/types/word";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

export default function CreateP() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState<Lang>("eng");
  const { mutate: createF } = api.word.create.useMutation({
    onSuccess: (data: Word) => {
      router.push("/words/" + data.id);
    },
  });
  const createWord = () => {
    createF({word , language})
  }
  return (
    <Layout>
     
      <div className="flex flex-col gap-4">
         <Title>create</Title>
        <div className="flex gap-2 text-primary-2">
          <button
            onClick={() => setLanguage("eng")}
            className={cn(
              "px-4 rounded-md",
              language == "eng" ? "bg-primary-4 text-primary-1" : "",
            )}
          >
            eng
          </button>
          <button
            onClick={() => setLanguage("rus")}
            className={cn(
              "px-4 rounded-md",
              language == "rus" ? "bg-primary-4 text-primary-1" : "",
            )}
          >
            rus
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.currentTarget.value)}
              placeholder="word"
              className="w-full rounded-[4px] bg-primary-3 p-[6px] focus-visible:outline-0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createWord();
                }
              }}
            />
          </div>
          <button onClick={() =>createWord()}>
            create
          </button>
        </div>
      </div>
    </Layout>
  );
}
