/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './EditTask.scss';

function EditTask({
  currentTask, updateTasks, tasks, changeCurrentTask,
}) {
  const [taskName, setTaskName] = useState(currentTask.name);
  // console.log(currentTask.descr);

  const refFirst = useRef();

  let editable = true;

  const removeTask = (taskId) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
    changeCurrentTask({});
  };

  const toggleTask = (taskId) => {
    updateTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
    changeCurrentTask({ ...currentTask, complete: !currentTask.complete });
  };

  const saveTaskEdit = function () {
    if (editable) {
      refFirst.current.contentEditable = true;
      refFirst.current.focus();
    } else {
      setTaskName(refFirst.current.textContent);
      refFirst.current.contentEditable = false;

      if (refFirst.current.textContent) {
        updateTasks([
          ...tasks.map((taskItem) => (taskItem.id === currentTask.id
            ? { ...currentTask, name: refFirst.current.textContent }
            : { ...taskItem })),
        ]);
      } else {
        refFirst.current.textContent = taskName[0];
        updateTasks([
          ...tasks.map((taskItem) => (taskItem.id === currentTask.id
            ? { ...currentTask, name: refFirst.current.textContent }
            : { ...taskItem })),
        ]);
      }
    }

    editable = !editable;
  };

  const keySaveTaskEdit = (e) => {
    if (e.key === 'Enter') {
      refFirst.current.blur();
    }
  };

  const changeDescr = (e) => {
    updateTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === currentTask.id ? { ...task, descr: e.target.value } : { ...task })),
    ]);
    changeCurrentTask({ ...currentTask, descr: e.target.value });
  };

  return (
    <section className="todo__edit edit">
      <h2 className="edit__title">Edit task</h2>
      {currentTask.name ? (
        <div>
          <h3
            ref={refFirst}
            onBlur={saveTaskEdit}
            onKeyDown={keySaveTaskEdit}
            onClick={saveTaskEdit}
            className="edit__name"
          >
            {currentTask.name}
          </h3>
          <textarea
            className="edit__descr"
            placeholder="Enter task description:"
            value={currentTask.descr}
            onChange={(e) => changeDescr(e)}
          />
          <h3 className="edit__task">
            {'Task status: '}
            <span
              className={cn({
                _complete: currentTask.complete,
              })}
            >
              {' '}
              {currentTask.complete ? 'Done' : 'Active'}
            </span>
          </h3>
          <div className="edit__buttons">
            <button className="_btn" type="submit" onClick={() => toggleTask(currentTask.id)}>
              Change status
            </button>
            <button className="_btn" type="submit" onClick={() => removeTask(currentTask.id)}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default EditTask;
