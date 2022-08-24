/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import './EditTask.scss';

function EditTask({
  currentTask, updateTasks, tasks, changeCurrentTask,
}) {
  // Создание состояния для название задачи
  const [taskName, setTaskName] = useState(currentTask.name);
  // Создание ссылки на название текущей задачи
  const nameTaskRef = useRef();

  // Объявление и инициализация переменной-флага для возможности редактирования названия задачи
  let editable = true;

  // Удаление выбранной задачи из списка задач
  const removeTask = (taskId) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
    changeCurrentTask({});
  };

  // Изменение состояния выполнения выбранной задачи
  const toggleTask = (taskId) => {
    updateTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
    changeCurrentTask({ ...currentTask, complete: !currentTask.complete });
  };

  // Сохранение изменения имени выбранной задачи
  const saveTaskEdit = function () {
    if (editable) {
      nameTaskRef.current.contentEditable = true;
      nameTaskRef.current.focus();
    } else {
      setTaskName(nameTaskRef.current.textContent);
      nameTaskRef.current.contentEditable = false;

      if (nameTaskRef.current.textContent) {
        updateTasks([
          ...tasks.map((taskItem) => (taskItem.id === currentTask.id
            ? { ...currentTask, name: nameTaskRef.current.textContent }
            : { ...taskItem })),
        ]);
      } else {
        nameTaskRef.current.textContent = taskName[0];
        updateTasks([
          ...tasks.map((taskItem) => (taskItem.id === currentTask.id
            ? { ...currentTask, name: nameTaskRef.current.textContent }
            : { ...taskItem })),
        ]);
      }
    }

    editable = !editable;
  };

  // Сохранение изменения имени выбранной задачи при нажатии на кнопку 'Enter'
  const keySaveTaskEdit = (e) => {
    if (e.key === 'Enter') {
      nameTaskRef.current.blur();
    }
  };

  // Изменение описания выбранной задачи
  const changeDescr = (e) => {
    updateTasks([
      ...tasks.map((task) => (task.id === currentTask.id ? { ...task, descr: e.target.value } : { ...task })),
    ]);
    changeCurrentTask({ ...currentTask, descr: e.target.value });
  };

  // Рендер компонента изменения задачи
  return (
    <section className="todo__edit edit">
      <h2 className="edit__title">Edit task</h2>
      {currentTask.name ? (
        <div>
          <h3
            ref={nameTaskRef}
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
