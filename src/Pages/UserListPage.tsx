import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../store/feature/user/userSlice";
import { useGetUsersQuery } from "../store/feature/user/userApiSlice";
import Loading from "../components/Loading";

const UserList = () => {
  const users = useSelector(selectAllUsers);
  const { isLoading, isError } = useGetUsersQuery(null);

  if (isLoading) {
    return <Loading messagae="Loading, please wait..." />;
  }
  if (isError) return <div>Error fetching users.</div>;

  return (
    <section>
      <h2>Users</h2>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserList;
