import { useRef, useState } from "react";
import Spinner from "../components/Spinner";
import { KEYS } from "../services";
import useTasks from "../services/TasksServices";
import useUsers from "../services/useUsers";
import ReactPaginate from 'react-paginate';
import Task from '../components/Task';

const Tasks = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [taskStatusFilter, setTaskStatusFilter] = useState({
    completed: "",
  });
  const [titleStatusFilter, setTitleStatusFilter] = useState({
    title: "",
    isSearching: false,
  });
  const [userFilter, setUserFilter] = useState("");
  const {
    data: users,
    loading: loadingUsers,
    error: userError,
  } = useUsers(KEYS.USERS_KEY);
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useTasks({
    key: KEYS.TASKS_KEY,
    queries: {
      ...taskStatusFilter,
      title: titleStatusFilter.isSearching ? titleStatusFilter.title : "",
    },
    user: userFilter,
  });

  const resetFilters = () => {
    setTaskStatusFilter({ completed: "" });
    setTitleStatusFilter({ isSearching: false, title: "" });
  };

  const onSearch = (title: string) =>
    setTitleStatusFilter({ isSearching: true, title });

  // paginate
  const [itemOffset, setItemOffset] = useState(0);


  const endOffset = itemOffset + 5;
  const currentItems = tasks?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tasks?.length / 5);

  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * 5) % tasks?.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="items-center justify-center">
      <div className="flex md:order-2 items-center justify-center">
        <div className="relative md:block">
          <input
            ref={inputRef}
            type="text"
            id="search-navbar"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={titleStatusFilter.title}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setTitleStatusFilter({
                ...titleStatusFilter,
                title: e.currentTarget.value,
              });
            }}
          />
          <button
            data-testid="dispatchinfo"
            className="absolute z-50 inset-y-0 left-0 flex items-center pl-3" 
            onClick={() => {
              if (inputRef && inputRef.current) onSearch(inputRef.current.value);
            }}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetFilters}>
          Reset filters
        </button>
      </div>
      {tasksLoading && <Spinner />}
      {!tasksLoading && !tasksError && tasks && tasks.length > 0 && (
        <>
          <ul>
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal"
                          >
                            Title
                          </th>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="status"
                                value={taskStatusFilter.completed}
                                onChange={(e) =>
                                  setTaskStatusFilter({
                                    completed: e.target.value,
                                  })
                                }
                              >
                                <option value="">Status</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="users"
                                value={userFilter}
                                disabled={loadingUsers || userError}
                                onChange={(e) => setUserFilter(e.target.value)}
                              >
                                <option value="">User</option>
                                {Array.isArray(users) &&
                                  users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                      {user.name}
                                    </option>
                                  ))}
                              </select>
                            </span>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((task) => (
                            <Task task={task} key={task.title + task.id}/>
                        ))}
                      </tbody>
                    </table>
                    <div className="Page navigation example">
                          <ReactPaginate 
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            pageLinkClassName="page-link"
                            previousClassName="page-item px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            previousLinkClassName="page-link"
                            nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            nextLinkClassName="page-link"
                            breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            breakLinkClassName="page-link"
                            marginPagesDisplayed={2}
                            containerClassName="paginate inline-flex -space-x-px"
                            activeClassName="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            previousLabel="Previous"
                          />

                        </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </>
      )}
      {tasks && tasks.length === 0 && (
        <img
          src="https://c.tenor.com/V6viLE6UQPEAAAAC/john-travolta-where-are-you-guys.gif"
          alt="nothing"
        />
      )}
    </div>
  );
};

export default Tasks;
