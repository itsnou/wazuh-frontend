import { useParams } from "react-router-dom";
import { KEYS } from "../services";
import useUsers from "../services/useUsers";
import Spinner from "../components/Spinner";

const User = () => {
  const { id } = useParams();
  const { data, loading, error } = useUsers(KEYS.USER_KEY, id);
  return (
    <div className="flex justify-center mt-7">
      {loading && <Spinner />}
      {error && <div>Error</div>}
      {data && 'name' in data && (
        <div className="w-9/12 text-center rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h1>Id: {data.id}</h1>
            <h1>Name: {data.name}</h1>
            <p>Username: {data.username}</p>
            <p>Email: {data.email}</p>
            <p>City: {data.address.city}</p>
            <p>Street: {data.address.street}</p>
            <p>Zipcode: {data.address.zipcode}</p>
            <p>Phone: {data.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
