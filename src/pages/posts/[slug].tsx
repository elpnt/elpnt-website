import * as fs from "fs";
import path from "path";

import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";

import { Head } from "@/lib/Head";
import type { Meta } from "@/types";
import { getPosts } from "@/utils/getPosts";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ParsedUrlQuery } from "querystring";

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
    <>
      <Head title={`${title} | elpnt`} />
      <div className="relative overflow-hidden py-16">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-blue mx-auto mt-6 dark:prose-invert">
            <h1>
              <span className="block text-center text-lg font-semibold tracking-wide text-blue-700 dark:text-blue-500">
                {format(new Date(publishedAt), "yyyy-MM-dd (eee)")}
              </span>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">
                {title}
              </span>
            </h1>
            <MDXRemote {...source} />
          </article>
        </div>
      </div>
    </>
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
