import { useCallback } from "react";

import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

import { BLOG_NAME, BLOG_SOURCE_URL } from "@/config";

const navItems = [
  { name: "Posts", href: "/posts" },
  { name: "Works", href: "/works" },
];

const NavBar = () => {
  const router = useRouter();

  const isCurrent = useCallback(
    (href: string) => router.pathname.startsWith(href),
    [router]
  );

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-10 bg-white/80 shadow backdrop-blur dark:bg-zinc-900/80 dark:shadow-zinc-800"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <a className="text-2xl font-bold text-zinc-900 dark:text-zinc-200">
                      {BLOG_NAME}
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map(({ name, href }) => (
                    <Link href={href} key={href}>
                      <a
                        className={clsx(
                          isCurrent(href)
                            ? "border-blue-500 text-zinc-900 dark:border-blue-600 dark:text-zinc-200"
                            : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300",
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                        )}
                      >
                        {name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <a
                  href={`${BLOG_SOURCE_URL}`}
                  className="rounded-full p-1 text-zinc-600 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <span className="sr-only">View source</span>
                  <FaGithub className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className={clsx(
                    "inline-flex items-center justify-center rounded-md p-2",
                    "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
                    "dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  )}
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navItems.map(({ name, href }) => (
                <Disclosure.Button className="w-full px-3" key={href}>
                  <Link href={href}>
                    <a
                      className={clsx(
                        isCurrent(href)
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-zinc-800 dark:text-white"
                          : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white",
                        "block border-l-4 py-2 pl-3 pr-4 text-left text-base font-medium dark:rounded-md dark:border-none"
                      )}
                    >
                      {name}
                    </a>
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-zinc-200 px-2 py-2 dark:border-zinc-800">
              <Disclosure.Button
                as="a"
                href={`${BLOG_SOURCE_URL}`}
                className="group flex items-center rounded-md px-3 py-2 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                <FaGithub
                  className="h-6 w-6 text-zinc-800 group-hover:text-zinc-50 dark:text-zinc-400"
                  aria-hidden="true"
                />
                <div className="ml-3">
                  <div className="text-base font-medium text-zinc-800 group-hover:text-white dark:text-zinc-300">
                    View source
                  </div>
                </div>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen">
      <NavBar />
      {children}
    </main>
  );
};
