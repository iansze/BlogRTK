import { useSelector } from "react-redux";
import PostArticle from "../components/PostArticle";

import { useGetPostsQuery } from "../store/feature/posts/postsApiSlice";
import { Post } from "../types/types";
import { selectAllPosts } from "../store/feature/posts/postSlice";

const PostsList = () => {
  // Directly Fetching Data with an RTK Query Hook
  const { isLoading, isError, error } = useGetPostsQuery(null);
  // Get data from the store using a selector
  const posts = useSelector(selectAllPosts);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    let errorMessage = "An error occurred";
    if ("status" in error && "data" in error) {
      errorMessage = `Error ${error.status}`;
    }
    content = <p>{errorMessage}</p>;
  } else if (posts) {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const limitedPosts = orderedPosts.slice(0, 20);
    content = limitedPosts.map((post: Post) => <PostArticle key={post.id} post={post} />);
  }

  return <section>{content}</section>;
};

export default PostsList;
