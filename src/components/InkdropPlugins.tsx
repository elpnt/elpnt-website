import { DownloadIcon } from "@heroicons/react/solid";
import Image from "next/image";
import useSWR from "swr";

import type { InkdropPlugin } from "@/types";

export const InkdropPlugins: React.FC = () => {
  const { data: plugins } = useSWR<InkdropPlugin[]>(
    "/api/inkdropPlugins",
    (url: string) => fetch(url).then((res) => res.json())
  );

  return (
    <div className="relative min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Inkdrop plugins
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-5xl lg:grid-cols-3">
          {plugins &&
            plugins.map(({ name, href, imageSrc, downloads }) => (
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
                          <span className="font-bold">{downloads}</span>{" "}
                          downloads
                        </span>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                        {name}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
