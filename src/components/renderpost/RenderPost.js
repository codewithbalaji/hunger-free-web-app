import { useAuth } from "hooks/auth";
import { usePosts } from "hooks/posts";
import PostsLists from 'components/post/PostsList';
import Swal from "sweetalert2";


const RenderPost = () => {
    const { posts, isLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();

  if (isLoading || authLoading) {
    Swal.fire({
      title: 'Loading user posts...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  } else {
    Swal.close();
  }

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