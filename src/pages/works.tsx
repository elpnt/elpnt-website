import { InkdropPlugins } from "@/components";
import { MainLayout } from "@/components/Layout";
import type { InkdropPlugin } from "@/types";
import { getInkdropPlugins } from "@/utils/getInkdropPlugins";

import type { GetStaticProps, NextPage } from "next";

const ONE_DAY_IN_SECONDS = 24 * 60;

interface Props {
  plugins: InkdropPlugin[];
}

const Works: NextPage<Props> = ({ plugins }) => {
  return (
    <MainLayout>
      <InkdropPlugins data={plugins} />
    </MainLayout>
  );
};

export default Works;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const plugins = await getInkdropPlugins();

  return {
    props: {
      plugins,
    },
    revalidate: ONE_DAY_IN_SECONDS,
  };
};
