import React, { useState } from 'react';
import cn from 'classnames';
import { TiDelete } from 'react-icons/ti';
import './TodoTask.scss';

function TodoTask({ task, toggleTask, removeTask }) {
  console.log(task);
  return (
    <li className="todo__task">
      <input type="checkbox" onChange={() => toggleTask(task.id)} />
      <h3
        className={cn({
          _complete: task.complete,
        })}
      >
        {task.name.length > 25 ? `${task.name.slice(0, 25)}...` : task.name}
      </h3>
      <TiDelete
        className="task__delete"
        cursor="pointer"
        title="Delete task"
        onClick={() => removeTask(task.id)}
      />
    </li>
  );
}

export default TodoTask;
