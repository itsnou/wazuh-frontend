import { useState, useEffect } from "react";
import { IDatum } from "../interfaces";
import { usersServices } from "./UsersServices";

const useUsers = (key: string, id?: string) => {
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

export default useUsers;
