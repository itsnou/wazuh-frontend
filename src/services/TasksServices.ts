import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
import { IRootTask, ITask } from "../interfaces";
import { Api } from "../providers";
import { usersServices } from "./UsersServices";

const getTasks = (query: string) => Api.get<IRootTask>(`/tasks${query}`);
const getTask = (id: string) => Api.get<ITask>(`/tasks/${id}`);

export const tasksServices = {
  getTasks,
  getTask,
};

interface IProps {
  key: string;
  id?: string;
  queries?: { title: string; completed: string;};
  user?: string;
}

const useTasks = ({ key, id, queries, user }: IProps) => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [task, setTask] = useState<ITask | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = queries ? `?${createSearchParams(queries)}` : "";

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        if (key === "tasks" && query && queries && user) {
          const { data } = user
            ? await usersServices.getTasksByUser(user, query)
            : await tasksServices.getTasks(query);
          setTasks(data.data);
        }
        if (key === "tasks" && query && queries) {
          const { data } = user
            ? await usersServices.getTasksByUser(user, query)
            : await tasksServices.getTasks(query);
          setTasks(data.data);
        }
        if (key === "task" && id) {
          const { data } = await tasksServices.getTask(id);
          setTask(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    !id && setTask(undefined);
    fetchTasks();
  }, [key, id, query, user]);

  return {
    tasks,
    task,
    loading,
    error,
  };
};

export default useTasks;
