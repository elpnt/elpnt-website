import { MainLayout } from "@/components/Layout/MainLayout";
import { PostsList } from "@/components/PostsList";
import { Head } from "@/lib/Head";
import type { Post } from "@/types";
import { getPosts } from "@/utils/getPosts";

import type { GetStaticProps, NextPage } from "next";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <MainLayout>
      <Head title="elpnt website" />
      <PostsList posts={posts} />
    </MainLayout>
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
