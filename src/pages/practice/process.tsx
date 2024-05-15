import { Dices, Shuffle } from "lucide-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Title } from "~/components/common/title";
import { WordSwitchCard } from "~/components/practice/wordSwitchCard";
import { PickButton } from "~/components/ui/pickButton";
import { Layout } from "~/features/layout/layout";
import { Mode, ZMode, ZPracticeLang } from "~/types/practice";
import { PracticeLang } from "~/types/practice";
import { Lang } from "~/types/word";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { PracticeModeIndexGenerator, practiceModeMap } from "~/utils/practice";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { language, mode } = ctx.query;
  try {
    const MODE = ZMode.parse(mode);
    const LANGUAGE = ZPracticeLang.parse(language);
    return {
      props: {
        LANGUAGE,
        MODE,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/practice",
        permanent: false,
      },
    };
  }
};

// const queryCheck = (router: NextRouter) => {
//   if (router.query.mode && router.query.language) {
//     try {
//       const MODE = ZMode.parse(router.query.mode);
//       const LANGUAGE = ZPracticeLang.parse(router.query.language);
//       return { mode: MODE, language: LANGUAGE };
//     } catch (e) {
//       router.push("/practice");
//       throw e;
//     }
//   }
// };

export default function PracticeProcessP({
  LANGUAGE,
  MODE,
}: {
  LANGUAGE: PracticeLang;
  MODE: Mode;
}) {
  const [isAnimate, setIsAnimate] = useState(false);

  const startAnimation = () => {
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 100);
  };

  const [rusWords, setRusWords] = useState<string[]>([]);
  const [engWords, setEngWords] = useState<string[]>([]);
  const [defaultSide, setDefaultSide] = useState<Lang | undefined>(undefined);
  const [indexer, setIndexer] = useState<
    PracticeModeIndexGenerator | undefined
  >(undefined);
  const { data: totalCount, isLoading: totalCountLoading } =
    api.word.getCount.useQuery({
      language: LANGUAGE !== "both" ? LANGUAGE : undefined,
      remembered: false,
    });

  useEffect(() => {
    if (totalCount && MODE) {
      setIndexer(new practiceModeMap[MODE](totalCount));
    }
  }, [MODE, totalCount, totalCountLoading]);

  const { mutate: getByIndex } = api.word.getByIndexForPractice.useMutation({
    onSuccess: (data) => {
      const word = data;
      if (word) {
        if (word.language == "russian") {
          setRusWords([word.word]);
          setEngWords(word.meanings.map((w) => w.word));
          setDefaultSide("russian");
        } else {
          setEngWords([word.word]);
          setRusWords(word.meanings.map((w) => w.word));
          setDefaultSide("english");
        }
      }
    },
  });

  const nextF = () => {
    if (indexer) {
      startAnimation();
      const index = indexer.getNext();
      getByIndex({
        index,
        language: LANGUAGE !== "both" ? LANGUAGE : undefined,
        remembered: false,
      });
    }
  };

  useEffect(() => {
    if (defaultSide == undefined) {
      nextF();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexer]);

  return (
    <Layout page="Practice">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-primary-1">
          <Title>practice</Title>
          <PracticeSettings LANGUAGE={LANGUAGE} MODE={MODE} />
        </div>

        <div className="flex h-[700px] w-full flex-col items-center px-32 py-4">
          {defaultSide && indexer && (
            <div
              className={cn(
                "h-full w-full transition duration-[100ms] ease-in",
                isAnimate ? "scale-[101%]" : "",
              )}
            >
              <WordSwitchCard
                rusWords={rusWords}
                engWords={engWords}
                defaultSide={defaultSide}
              />
            </div>
          )}
          <button
            onClick={() => nextF()}
            className="p-4 text-[30px] text-primary-1"
          >
            next
          </button>
        </div>
      </div>
    </Layout>
  );
}

const PracticeSettings: FC<{ MODE: Mode; LANGUAGE: PracticeLang }> = ({
  LANGUAGE,
  MODE,
}) => {
  const router = useRouter();

  const [language, setLanguage] = useState<PracticeLang | undefined>(undefined);
  const [mode, setMode] = useState<Mode | undefined>(undefined);

  useEffect(() => {
    if (language == undefined && mode == undefined) {
      setLanguage(LANGUAGE);
      setMode(MODE);
    }

    if (mode && language) {
      if (language !== LANGUAGE || mode !== MODE) {
        router.push(`/practice/process?language=${language}&mode=${mode}`);
      }
    }
  }, [language, mode, LANGUAGE, MODE, router]);

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
