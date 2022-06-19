import type { Plugin } from "@/components";
import { InkdropPlugins } from "@/components";
import { MainLayout } from "@/components/Layout";

import type { GetStaticProps, NextPage } from "next";

type Props = {
  plugins: Plugin[];
};

const plugins = [
  {
    name: "code-title",
    href: "https://my.inkdrop.app/plugins/code-title",
    imageSrc: "/inkdrop-code-title.png",
  },
  {
    name: "link-card",
    href: "https://my.inkdrop.app/plugins/link-card",
    imageSrc: "/inkdrop-link-card.png",
  },
];

const Works: NextPage<Props> = ({ plugins }) => {
  return (
    <MainLayout>
      <InkdropPlugins plugins={plugins} />
    </MainLayout>
  );
};

export default Works;

export const getStaticProps: GetStaticProps = async () => {
  const inkdropApi = process.env.INKDROP_API as string;

  const pluginsData = await Promise.all(
    plugins.map(async ({ name, href, imageSrc }) => {
      const url = new URL(name, inkdropApi).toString();
      const res = await fetch(url);
      const json = await res.json();

      return {
        name,
        href,
        imageSrc,
        version: json.releases.latest,
        downloads: json.downloads,
      };
    })
  );

  return {
    props: {
      plugins: pluginsData,
    },
  };
};
