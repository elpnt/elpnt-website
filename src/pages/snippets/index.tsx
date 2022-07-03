import { MainLayout } from "@/components/Layout";
import { SnippetsList } from "@/components/SnippetsList";
import { Head } from "@/lib/Head";
import type { Post } from "@/types";
import { getSnippets } from "@/utils/getSnippets";

import type { GetStaticProps, NextPage } from "next";

interface Props {
  snippets: Post[];
}

const Home: NextPage<Props> = ({ snippets }) => {
  return (
    <MainLayout>
      <Head title="elpnt website" />
      <div className="min-h-screen">
        <SnippetsList snippets={snippets} />
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const snippets = getSnippets();

  return {
    props: {
      snippets,
    },
  };
};

export default Home;
