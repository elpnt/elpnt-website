import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full" lang="ja">
        <Head>
          <link
            href="https://fonts.google.com/specimen/Inter"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full bg-gray-50/70 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
