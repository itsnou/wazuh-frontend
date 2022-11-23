import { Link } from "react-router-dom";
import { KEYS } from "../services/index";
import { IDatum } from "../interfaces/userInterfaces";
import useUsers from "../services/useUsers";
import Spinner from "../components/Spinner";

export const Users = () => {
  const { data, loading, error } = useUsers(KEYS.USERS_KEY);

  return (
    <>
      <h1 role="contentinfo" className="text-3xl font-bold underline">Users</h1>
      <div className="grid grid-cols-3 gap-4">
        {loading && <Spinner />}
        {error && <p>{error}</p>}
        {Array.isArray(data) &&
          data.map((user: IDatum, index: number) => {
            return (
              <div key={index}>
              <Link to={`/users/${user.id}`}>
                <div data-testid={user.id} className="text-center rounded overflow-hidden shadow-lg text-center">
                  <div className="px-6 py-4 text-center" data-testid='user-data'>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                  </div>
                </div>
              </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};
