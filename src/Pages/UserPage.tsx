import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../store/feature/user/userSlice";
import { selectAllPosts } from "../store/feature/posts/postSlice";

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) => selectUserById(state, userId as string));
  const posts = useSelector(selectAllPosts);

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>
        {posts
          .filter((post) => post.userId.toString() === userId)
          .map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default UserPage;
