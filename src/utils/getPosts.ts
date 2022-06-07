import fs from "fs";
import path from "path";

import matter from "gray-matter";

export const getPosts = () => {
  const dirFiles = fs.readdirSync(
    path.join(process.cwd(), "src", "pages", "blog"),
    {
      withFileTypes: true,
    }
  );

  const posts = dirFiles
    .map((file) => {
      if (!file.name.endsWith(".mdx")) return;

      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "src", "pages", "blog", file.name),
        "utf-8"
      );

      const { data, content } = matter(fileContent);
      const slug = file.name.replace(/.mdx$/, "");

      return { slug, data: JSON.parse(JSON.stringify(data)), content };
    })
    .filter((post) => post);

  return posts;
};
