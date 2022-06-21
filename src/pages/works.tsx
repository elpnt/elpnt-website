import { SWRConfig } from "swr";

import { InkdropPlugins } from "@/components";
import { MainLayout } from "@/components/Layout";
import type { InkdropPlugin } from "@/types";
import { getInkdropPlugins } from "@/utils/getInkdropPlugins";

import type { GetStaticProps, NextPage } from "next";

interface Props {
  fallback: {
    "/api/inkdropPlugins": InkdropPlugin[];
  };
}

const Works: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <MainLayout>
        <InkdropPlugins />
      </MainLayout>
    </SWRConfig>
  );
};

export default Works;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const plugins = await getInkdropPlugins();

  return {
    props: {
      fallback: {
        "/api/inkdropPlugins": plugins,
      },
    },
  };
};
