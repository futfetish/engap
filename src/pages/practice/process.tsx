import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Title } from "~/components/common/title";
import { PickButton } from "~/components/ui/pickButton";
import { Layout } from "~/features/layout/layout";
import { Lang, PracticeLang } from "~/types/word";

export default function PracticeProcessP() {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout page="Practice">
      <div className="flex flex-col gap-4">
        <div>
          <Title>practice</Title>
        </div>
      </div>
    </Layout>
  );
}


const PracticeSettings : FC = () => {
    const [language, setLanguage] = useState<PracticeLang>("both");
    return <div>
          <div className="flex gap-2 text-primary-2">
          <PickButton className="w-[100px]" value={'english'} pick={language} setPick={setLanguage}>
            eng
          </PickButton>
          <PickButton className="w-[100px]" value={'russian'} pick={language} setPick={setLanguage}>
            rus
          </PickButton>
        </div>
    </div>
}