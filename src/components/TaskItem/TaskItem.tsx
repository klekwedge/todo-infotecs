import cn from 'classnames';
import { TiDelete, TiEdit } from 'react-icons/ti';
import './TaskItem.scss';
import { ITaskItem } from '../../types/TaskItem.type';

interface TaskItemProps {
  task: ITaskItem;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  changeCurrentTask: (task: ITaskItem | null) => void;
  currentTask: ITaskItem | null;
}

function TaskItem({
  task, toggleTask, removeTask, changeCurrentTask, currentTask,
}: TaskItemProps) {
  function changeCurrentTaskStatus() {
    if (currentTask) {
      if (currentTask.id === task.id) {
        changeCurrentTask({ ...task, complete: !task.complete });
      }
    }
  }

  return (
    <li className="todo__task task">
      <div className="task__wrapper">
        <input
          id={task.id}
          type="checkbox"
          name={task.id}
          checked={task.complete}
          onChange={() => {
            toggleTask(task.id);
            changeCurrentTaskStatus();
          }}
        />
        <label htmlFor={task.id}>
          <h3
            className={cn({
              _complete: task.complete,
            })}
          >
            {task.name.length > 20 ? `${task.name.slice(0, 20)}...` : task.name}
          </h3>
          {' '}
        </label>
      </div>
      <div className="task__options">
        <TiEdit
          cursor="pointer"
          title="Edit task"
          size="18"
          onClick={() => {
            changeCurrentTask(task);
          }}
        />
        <TiDelete
          className="task__delete"
          cursor="pointer"
          title="Delete task"
          size="18"
          onClick={() => {
            removeTask(task.id);
            changeCurrentTask(null);
          }}
        />
      </div>
    </li>
  );
}

export default TaskItem;
