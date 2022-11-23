import {IUserObject, IDatum, IRootTask} from '../interfaces'
import { Api } from "../providers";

const getUsers = () => Api.get<IUserObject>("/users");
const getUser = (id: string) => Api.get<IDatum>(`/users/${id}`);
const getTasksByUser = (id: string, query: string) => Api.get<IRootTask>(`/users/${id}/tasks${query}`);

export const usersServices = {
  getUsers,
  getUser,
  getTasksByUser
};

/* const useUsers = (key: string, id?: string) => {
  const [data, setData] = useState<IDatum | IDatum[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (key === "users") {
          const { data } = await usersServices.getUsers();
          setData(data.data);
        }
        if (key === "user" && id) {
          const { data } = await usersServices.getUser(id);
          setData(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [key, id]);

  return {
    data,
    loading,
    error,
  };
};

export default useUsers; */
