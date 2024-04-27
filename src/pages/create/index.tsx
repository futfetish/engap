import { useRouter } from "next/router";
import { useState } from "react";
import { Lang } from "~/types/word";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

export default function CreateP() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [lang, setLang] = useState<Lang>("eng");
  const { mutate: createF } = api.word.create.useMutation({
    onSuccess: (data) => {
      router.push("/words/" + data.id);
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button onClick={() => setLang('eng')} className={cn( 'px-4' , 'rounded-md' ,lang == 'eng' ? 'bg-slate-200' : '')}>eng</button>
        <button onClick={() => setLang('rus')} className={cn( 'px-4' , 'rounded-md' ,lang == 'rus' ? 'bg-slate-200' : '')} >rus</button>
      </div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          type="text"
          className="rounded-[2px] border-[1px] border-black px-2"
        />
        <button onClick={() => createF({ word: value, language: lang })}>
          create
        </button>
      </div>
    </div>
  );
}
