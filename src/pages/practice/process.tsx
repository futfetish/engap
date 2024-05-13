import { Dices, Shuffle } from "lucide-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Title } from "~/components/common/title";
import { WordSwitchCard } from "~/components/practice/wordSwitchCard";
import { PickButton } from "~/components/ui/pickButton";
import { Layout } from "~/features/layout/layout";
import { Mode, ZMode, ZPracticeLang } from "~/types/practice";
import { PracticeLang } from "~/types/practice";

export default function PracticeProcessP() {
  //   const router = useRouter();
  //   console.log(router.query);
  return (
    <Layout page="Practice">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-primary-1">
          <Title>practice</Title>
          <PracticeSettings />
        </div>
        <div className="flex justify-center w-full h-[600px] py-4 px-32">
          <WordSwitchCard rusWords={['rus1'  , 'rus2']} engWords={['eng1'  , 'eng2' , 'eng3' , 'eng2'  , 'eng2'  , 'eng2'  , 'eng2'  , 'eng2' ]} defaultSide="english" />
        </div>
      </div>
    </Layout>
  );
}

const PracticeSettings: FC = () => {
  const router = useRouter();
  router.query;
  const [language, setLanguage] = useState<PracticeLang | undefined>(undefined);
  const [mode, setMode] = useState<Mode | undefined>(undefined);

  useEffect(() => {
    if (language == undefined && mode == undefined) {
      try {
        const MODE = ZMode.parse(router.query.mode);
        const LANGUAGE = ZPracticeLang.parse(router.query.language);
        setLanguage(LANGUAGE);
        setMode(MODE);
      } catch {
        router.push("/practice");
      }
    }

    if (router.query.mode && router.query.language && mode && language) {
      if (
        (language !== router.query.language || mode !== router.query.mode)
      ) {
        router.push(`/practice/process?language=${language}&mode=${mode}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, mode, router.query.language , router.query.mode]);

  return (
    <>
      <div className="flex gap-2 text-primary-2">
        <PickButton
          className="px-4"
          value={"english"}
          pick={language}
          setPick={setLanguage}
        >
          eng
        </PickButton>
        <PickButton
          className="px-4"
          value={"russian"}
          pick={language}
          setPick={setLanguage}
        >
          rus
        </PickButton>
        <PickButton
          className="px-4"
          value={"both"}
          pick={language}
          setPick={setLanguage}
        >
          both
        </PickButton>
      </div>

      <div className="flex gap-2 text-primary-2">
        <PickButton value={"shuffle"} pick={mode} setPick={setMode}>
          <Shuffle />
        </PickButton>
        <PickButton value={"random"} pick={mode} setPick={setMode}>
          <Dices />
        </PickButton>
      </div>
    </>
  );
};
