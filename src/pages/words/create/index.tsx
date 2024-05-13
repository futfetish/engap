import { useRouter } from "next/router";
import { useState } from "react";
import { Title } from "~/components/common/title";
import { MyInput } from "~/components/ui/myInput";
import { PickButton } from "~/components/ui/pickButton";
import { Layout } from "~/features/layout/layout";
import { Lang, Word } from "~/types/word";
import { api } from "~/utils/api";

export default function CreateP() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState<Lang>("english");
  const { mutate: createF } = api.word.create.useMutation({
    onSuccess: (data: Word) => {
      router.push("/words/" + data.id);
    },
  });
  const createWord = () => {
    createF({word , language})
  }
  return (
    <Layout page="Words">
      <div className="flex flex-col gap-4">
         <Title>create</Title>
        <div className="flex gap-2 text-primary-2">
          <PickButton className="w-[100px]" value={'english'} pick={language} setPick={setLanguage}>
            eng
          </PickButton>
          <PickButton className="w-[100px]" value={'russian'} pick={language} setPick={setLanguage}>
            rus
          </PickButton>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <MyInput
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
