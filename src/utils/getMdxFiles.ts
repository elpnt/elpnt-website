import * as fs from "fs";
import path from "path";

import matter from "gray-matter";

export const getMdxFiles = (contentsPath: string) => {
  const dirFiles = fs.readdirSync(
    path.join(process.cwd(), "contents", contentsPath),
    {
      withFileTypes: true,
    }
  );

  const posts = dirFiles
    .map((file) => {
      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "contents", contentsPath, file.name),
        "utf-8"
      );

      const { data, content } = matter(fileContent);
      const slug = file.name.replace(/.mdx$/, "");

      return { slug, meta: JSON.parse(JSON.stringify(data)), content };
    })
    .filter((post) => post)
    .sort((a, b) => dateSortDesc(a?.meta.publishedAt, b?.meta.publishedAt));

  return posts;
};

const dateSortDesc = (a: Date, b: Date) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
};
