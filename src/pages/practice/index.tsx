import { Dices, LucideIcon, Shuffle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Title } from "~/components/common/title";
import { Layout } from "~/features/layout/layout";
import { cn } from "~/utils/cn";
import { PickButton, PickButtonI } from "~/components/ui/pickButton";

export default function PracticeP() {
  type Lang = "russian" | "english" | "both";
  const [language, setLanguage] = useState<Lang>("both");

  type Mode = "shuffle" | "random";
  const [mode, setMode] = useState<Mode>("shuffle");

  return (
    <Layout page="Practice">
      <div className="flex flex-col gap-4">
        <Title>practice</Title>

        <div className="flex flex-col gap-2">
          <p>language</p>

          <div className="grid grid-cols-3 gap-4 ">
            <PickButton<Lang>
              pick={language}
              setPick={setLanguage}
              value="russian"
            >
              russian
            </PickButton>

            <PickButton<Lang>
              pick={language}
              setPick={setLanguage}
              value="english"
            >
              english
            </PickButton>

            <PickButton<Lang>
              pick={language}
              setPick={setLanguage}
              value="both"
            >
              both
            </PickButton>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>mode</p>

          <div className="grid grid-cols-3 gap-4 ">
            <PickModeButton<Mode>
              pick={mode}
              setPick={setMode}
              value={"shuffle"}
              Icon={Shuffle}
            >
              Shuffle
            </PickModeButton>

            <PickModeButton<Mode>
              pick={mode}
              setPick={setMode}
              value={"random"}
              Icon={Dices}
            >
              Random
            </PickModeButton>
          </div>
        </div>

        <div className="mt-8 flex justify-center ">
          <Link
            href={`/practice/process?language=${language}&mode=${mode}`}
            className="px-12 py-4 text-center text-[30px] text-primary-2 hover:text-primary-1"
          >
            start
          </Link>
        </div>
      </div>
    </Layout>
  );
}

interface PickModeButtonI<T> extends PickButtonI<T> {
  Icon: LucideIcon;
}

const PickModeButton = <T,>({
  children,
  className,
  Icon,
  ...props
}: PickModeButtonI<T>) => {
  return (
    <PickButton {...props} className={cn("p-6", className ?? "")}>
      <div className=" flex items-center gap-2">
        <div>
          <Icon size={32} />
        </div>
        <div className="text-[24px]"> {children} </div>
      </div>
    </PickButton>
  );
};