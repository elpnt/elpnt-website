import "../../styles/globals.css";
import "prism-themes/themes/prism-dracula.css";

import { MDXProvider } from "@mdx-js/react";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider>
      <div className="prose mx-auto max-w-3xl">
        <Component {...pageProps} />
      </div>
    </MDXProvider>
  );
}

export default MyApp;
