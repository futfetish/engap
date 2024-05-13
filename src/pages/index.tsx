import { Title } from "~/components/common/title";
import { Layout } from "~/features/layout/layout";

export default function Home() {
  return (
    <Layout page="Main">
      <Title>
        <div className="text-primary-1">main</div>
      </Title>
    </Layout>
  );
}
