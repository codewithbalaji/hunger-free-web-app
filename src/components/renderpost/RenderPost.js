import { useAuth } from "hooks/auth";
import { usePosts } from "hooks/posts";
import PostsLists from 'components/post/PostsList';


const RenderPost = () => {
    const { posts, isLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();

  if (isLoading || authLoading) return "Loading...";

  const isContributor = user && user.role === "contributor";
  const filteredPosts = isContributor
    ? posts.filter((post) => post.uid === user.id)
    : posts;

  return (
    <>
      <PostsLists posts={filteredPosts} />
    </>
  )
}

export default RenderPost