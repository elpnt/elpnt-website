import { ChevronRightIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import Link from "next/link";

import { Head } from "@/lib/Head";
import type { Post } from "@/types";
import { getPosts } from "@/utils/getPosts";

import type { GetStaticProps, NextPage } from "next";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head title="elpnt.dev" />
      <main className="mx-auto max-w-[52rem] px-4 pb-28 pt-8 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Posts
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            {/* Description */}
          </p>
        </div>
        <div className="relative mt-12 sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="absolute top-3 bottom-0 right-full mr-7 hidden w-px bg-zinc-200 dark:bg-zinc-800 sm:block md:mr-[3.25rem]" />
          <div className="space-y-12">
            {posts.map(({ slug, meta: { title, publishedAt } }) => (
              <article key={slug} className="group relative">
                <div className="absolute -inset-y-2.5 -inset-x-4 group-hover:bg-zinc-100/70 dark:group-hover:bg-zinc-800/50 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
                <svg
                  viewBox="0 0 9 9"
                  className="absolute right-full top-2 mr-6 hidden h-2 w-2 overflow-visible text-zinc-300 dark:text-zinc-600 sm:block md:mr-12"
                >
                  <circle
                    cx="4.5"
                    cy="4.5"
                    r="4.5"
                    stroke="currentColor"
                    className="fill-white dark:fill-zinc-900"
                    strokeWidth={2}
                  />
                </svg>
                <div className="relative">
                  <h3 className="pt-8 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 lg:pt-0">
                    {title}
                  </h3>
                  <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-20">
                    <dt className="sr-only">Date</dt>
                    <dd className="whitespace-nowrap text-base leading-6 text-zinc-500 dark:text-zinc-400">
                      <time dateTime={publishedAt}>
                        {format(new Date(publishedAt), "yyyy-MM-dd")}
                      </time>
                    </dd>
                  </dl>
                </div>
                <Link href={`/posts/${slug}`}>
                  <a className="flex items-center text-sm font-medium text-blue-500">
                    <span className="absolute -inset-y-2.5 -inset-x-4 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
                    <span className="relative">
                      Read more<span className="sr-only">, {title}</span>
                    </span>
                    <ChevronRightIcon className="relative mt-px ml-2.5 h-4 overflow-visible stroke-current" />
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
