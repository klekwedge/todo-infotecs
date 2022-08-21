/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from 'react';
import './TodoEdit.scss';

function TodoEdit({ currentTask }) {
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

      // setTasks([
      //   ...tasks.map((taskItem) => (taskItem.id === task.id
      //     ? { ...task, nameTask: refFirst.current.textContent }
      //     : { ...taskItem })),
      // ]);
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
      {currentTask ? (
        <div>
          <h3 ref={refFirst} onBlur={saveTaskEdit} onKeyDown={keySaveTaskEdit}>
            {currentTask.name}
          </h3>
          <h1 onClick={saveTaskEdit}>++++</h1>
        </div>
      ) : null}
    </section>
  );
}

export default TodoEdit;
