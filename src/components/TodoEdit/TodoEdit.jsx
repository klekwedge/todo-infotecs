/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from 'react';
import './TodoEdit.scss';

function TodoEdit({ currentTask, updateTasks, tasks }) {
  console.log(currentTask);
  const [taskName, setTaskName] = useState(currentTask.name);
  const refFirst = useRef();

  let edit = true;

  const saveTaskEdit = function () {
    if (edit) {
      refFirst.current.contentEditable = true;
      refFirst.current.focus();
    } else {
      setTaskName(refFirst.current.textContent);
      refFirst.current.contentEditable = false;

      updateTasks([
        ...tasks.map((taskItem) => (taskItem.id === currentTask.id
          ? { ...currentTask, nameTask: refFirst.current.textContent }
          : { ...taskItem })),
      ]);
    }

    edit = !edit;
  };

  const keySaveTaskEdit = (e) => {
    if (e.key === 'Enter') {
      refFirst.current.blur();
    }
  };

  return (
    <section className="todo__edit pan2">
      <h2 className="edit__title">Edit task</h2>
      {currentTask.name ? (
        <div>
          <h3
            ref={refFirst}
            onBlur={saveTaskEdit}
            onKeyDown={keySaveTaskEdit}
            onClick={saveTaskEdit}
          >
            Task name:
            {' '}
            {currentTask.name}
          </h3>
          <h3>
            Task status:
            {' '}
            {currentTask.complete ? 'Done' : 'Active'}
            {console.log(currentTask)}
          </h3>
        </div>
      ) : null}
    </section>
  );
}

export default TodoEdit;
