/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import cn from 'classnames';
import { TiDelete, TiEdit } from 'react-icons/ti';
import './TaskItem.scss';

function TaskItem({
  task, toggleTask, removeTask, changeCurrentTask,
}) {
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
            changeCurrentTask({ ...task, complete: !task.complete });
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
            changeCurrentTask({});
          }}
        />
      </div>
    </li>
  );
}

export default TaskItem;
