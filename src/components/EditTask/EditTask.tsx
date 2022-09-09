import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./EditTask.scss";
import { ITaskItem } from "../../types/TaskItem.type";

interface EditTaskProps {
  currentTask: ITaskItem | null;
  tasks: ITaskItem[];
  updateTasks: (taskList: ITaskItem[]) => void;
  changeCurrentTask: (task: ITaskItem | null) => void;
}

function EditTask({
  currentTask,
  tasks,
  updateTasks,
  changeCurrentTask,
}: EditTaskProps) {
  // Создание состояния для название задачи
  const [taskName, setTaskName] = useState<string>("");

  useEffect(()=>{
    if(currentTask){
      setTaskName(currentTask.name)
    }
  }, [currentTask])


  // Создание ссылки на название текущей задачи
  const nameTaskRef = useRef<HTMLHeadingElement>(null);

  // Объявление и инициализация переменной-флага для возможности редактирования названия задачи
  let editable = true;

  // Удаление выбранной задачи из списка задач
  const removeTask = (taskId: string) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
    changeCurrentTask(null);
  };

  // Изменение состояния выполнения выбранной задачи
  const toggleTask = (taskId: string) => {
    updateTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) =>
        task.id === taskId ? { ...task, complete: !task.complete } : { ...task }
      ),
    ]);
    if (currentTask) {
      changeCurrentTask({ ...currentTask, complete: !currentTask.complete });
    }
  };

  // Сохранение изменения имени выбранной задачи
  const saveTaskEdit = () => {
    if (editable && nameTaskRef.current) {
      nameTaskRef.current.contentEditable = "true";
      nameTaskRef.current.focus();
    } else {
      if (nameTaskRef.current && nameTaskRef.current.textContent) {
        setTaskName(nameTaskRef.current.textContent);
        nameTaskRef.current.contentEditable = "false";
      }


      if (
        nameTaskRef.current &&
        nameTaskRef.current.textContent &&
        currentTask
      ) {
        updateTasks([
          ...tasks.map((taskItem) =>
            taskItem.id === currentTask.id
              ? { ...currentTask, name: nameTaskRef.current!.textContent! }
              : { ...taskItem }
          ),
        ]);
      } else if (nameTaskRef.current && currentTask) {
        nameTaskRef.current.textContent = taskName[0];
        updateTasks([
          ...tasks.map((taskItem) =>
            taskItem.id === currentTask.id
              ? { ...currentTask, name: nameTaskRef.current!.textContent! }
              : { ...taskItem }
          ),
        ]);
      }
    }

    editable = !editable;
  };

  // Сохранение изменения имени выбранной задачи при нажатии на кнопку 'Enter'
  const keySaveTaskEdit = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter" && nameTaskRef.current) {
      nameTaskRef.current.blur();
    }
  };

  // Изменение описания выбранной задачи
  const changeDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentTask) {
      updateTasks([
        ...tasks.map((task) =>
          task.id === currentTask.id
            ? { ...task, descr: e.target.value }
            : { ...task }
        ),
      ]);
      changeCurrentTask({ ...currentTask, descr: e.target.value });
    }
  };

  // Рендер компонента изменения задачи
  return (
    <section className="todo__edit edit">
      <h2 className="edit__title">Edit task</h2>
      {currentTask && currentTask.name ? (
        <div>
          <h3
            ref={nameTaskRef}
            onBlur={saveTaskEdit}
            onKeyDown={(e) =>
              keySaveTaskEdit(e)
            }
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
            {"Task status: "}
            <span
              className={cn({
                _complete: currentTask.complete,
              })}
            >
              {currentTask.complete ? "Done" : "Active"}
            </span>
          </h3>
          <div className="edit__buttons">
            <button
              className="_btn"
              type="submit"
              onClick={() => toggleTask(currentTask.id)}
            >
              Change status
            </button>
            <button
              className="_btn"
              type="submit"
              onClick={() => removeTask(currentTask.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default EditTask;
