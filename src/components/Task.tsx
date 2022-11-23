import { ITask } from "../interfaces";

interface ITaskProps {
  task: ITask;
}

const Task = (props: ITaskProps) => {
  const {task} = props;
  return(
    <tr key={task.id} data-testid={task.title + task.id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {task.id}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {task.title}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {task.completed.toString()}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {task.user_id}
        </p>
      </td>
    </tr>
  )
}

export default Task;