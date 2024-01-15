import { useSelector } from "react-redux";
import { selectAllUsers } from "../store/feature/user/userSlice";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../store/feature/user/userApiSlice";
import Loading from "./Loading";

type PostAuthProps = {
  userId?: string;
};

const PostAuth = ({ userId }: PostAuthProps) => {
  const { isLoading, isError } = useGetUsersQuery(null);
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id.toString() === userId);

  if (isLoading) {
    return <Loading messagae="Loading, please wait..." />;
  }
  if (isError) return <span>Error fetching users.</span>;

  return (
    <span>
      By {author ? <Link to={`/user/${author.id}`}>{author.name}</Link> : "Unknown author"}
    </span>
  );
};

export default PostAuth;
