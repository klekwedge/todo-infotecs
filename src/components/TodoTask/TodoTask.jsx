/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import cn from 'classnames';
import { TiDelete } from 'react-icons/ti';
import './TodoTask.scss';

function TodoTask({
  task, toggleTask, removeTask, changeCurrentTask,
}) {
  return (
    <li className="todo__task task" onClick={() => changeCurrentTask(task)}>
      <div className="task__wrapper">
        <input type="checkbox" checked={task.complete} onChange={() => toggleTask(task.id)} />
        <h3
          className={cn({
            _complete: task.complete,
          })}
        >
          {task.name.length > 20 ? `${task.name.slice(0, 20)}...` : task.name}
        </h3>
      </div>
      <TiDelete
        className="task__delete"
        cursor="pointer"
        title="Delete task"
        size="18"
        onClick={() => removeTask(task.id)}
      />
    </li>
  );
}

export default TodoTask;
