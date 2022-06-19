import { DownloadIcon } from "@heroicons/react/outline";
import Image from "next/image";

import type { StaticImageData } from "next/image";

export type Plugin = {
  name: string;
  href: string;
  imageSrc: StaticImageData;
  version: string;
  downloads: number;
};

type InkdropPluginsProps = {
  plugins: Plugin[];
};

export const InkdropPlugins: React.FC<InkdropPluginsProps> = ({ plugins }) => {
  return (
    <div className="relative min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Inkdrop plugins
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-2xl lg:grid-cols-2">
          {plugins.map(({ name, href, imageSrc, downloads }) => (
            <a href={href} key={href}>
              <div className="flex flex-col overflow-hidden rounded-lg shadow-md hover:bg-zinc-50 hover:shadow dark:shadow-zinc-800/80 dark:hover:bg-zinc-800/20">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src={imageSrc}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <div className="inline-flex flex-1 items-center justify-center text-sm font-medium">
                      <DownloadIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
                      <span className="ml-2 text-zinc-800 dark:text-zinc-400">
                        <span className="font-bold">{downloads}</span> downloads
                      </span>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                      {name}
                    </p>
                  </div>
                  {/* <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-zinc-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-zinc-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
