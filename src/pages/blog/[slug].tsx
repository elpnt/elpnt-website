import * as fs from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";

import type { GetStaticPaths, GetStaticProps } from "next";

import { Meta } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/getPosts";

interface Props {
  source: MDXRemoteSerializeResult;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const PostPage = ({ source }: Props) => {
  const frontmatter = source.frontmatter as unknown;
  const { title, publishedAt, tags } = frontmatter as Meta;

  return (
    <div className="relative overflow-hidden py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-400">
              {formatDate(publishedAt)}
            </span>
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
          </h1>
        </div>
        <div className="prose prose-lg prose-sky mx-auto mt-6 text-gray-600">
          <MDXRemote {...source} />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post?.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const filePath = path.join(process.cwd(), "posts", `${params?.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");

  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
    parseFrontmatter: true,
  });

  return {
    props: {
      source: mdxSource,
    },
  };
};

export default PostPage;
