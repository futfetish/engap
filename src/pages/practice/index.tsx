import { Dices, Shuffle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card } from "~/components/card";
import { Title } from "~/components/title";
import { Layout } from "~/features/layout";
import { cn } from "~/utils/cn";

export default function PracticeP() {
  const [language, setLanguage] = useState<"russian" | "english" | "both">(
    "both",
  );

  const [mode, setMode] = useState<"shuffle" | "random">("shuffle");

  return (
    <Layout page="Practice">
      <div className="flex flex-col gap-4">
        <Title>practice</Title>
        <div className="flex flex-col gap-2">
          <p>language</p>

          <div className="grid grid-cols-3 gap-4 ">
            <Card
              onClick={() => setLanguage("russian")}
              className={cn(
                "cursor-pointer text-center text-primary-2",
                language == "russian" ? "!bg-primary-3 !text-primary-1" : "",
              )}
            >
              russian
            </Card>
            <Card
              onClick={() => setLanguage("english")}
              className={cn(
                "cursor-pointer text-center text-primary-2" ,
                language == "english" ? "!bg-primary-3 !text-primary-1" : "",
              )}
            >
              english
            </Card>
            <Card
              onClick={() => setLanguage("both")}
              className={cn(
                "cursor-pointer text-center text-primary-2",
                language == "both" ? "!bg-primary-3 !text-primary-1" : "",
              )}
            >
              both
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>mode</p>

          <div className="grid grid-cols-3 gap-4 ">
            <Card
              onClick={() => setMode("shuffle")}
              className={cn(
                "flex cursor-pointer justify-center p-6 text-primary-2",
                mode == "shuffle" ? "!bg-primary-3 !text-primary-1" : "",
              )}
            >
              <div className=" flex items-center gap-2">
                <div>
                  <Shuffle size={32} />
                </div>
                <div className="text-[24px]"> Shuffle </div>
              </div>
            </Card>
            <Card
              onClick={() => setMode("random")}
              className={cn(
                "flex cursor-pointer justify-center p-6 text-primary-2",
                mode == "random" ? "!bg-primary-3 !text-primary-1" : "",
              )}
            >
              <div className=" flex items-center gap-2">
                <div>
                  <Dices size={32} />
                </div>
                <div className="text-[24px]"> Random </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-center mt-8 ">
             <Link href={`/practice/process?language=${language}&mode=$`} className="text-center py-4 px-12 text-[30px] text-primary-2 hover:text-primary-1">
          start
        </Link>
        </div>
       
      </div>
    </Layout>
  );
}
