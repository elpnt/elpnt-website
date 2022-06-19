import { MainLayout } from "@/components/Layout";
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
      <div className="min-h-screen">
        <PostsList posts={posts} />
      </div>
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
