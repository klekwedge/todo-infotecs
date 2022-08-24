/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import TodoNewTask from '../NewTaskForm/NewTaskForm';
import TodoTask from '../TaskItem/TaskItem';
import SearchTask from '../SearchTask/SearchTask';
import './TasksList.scss';

function TasksList({
  changeCurrentTask, tasks, updateTasks, currentTask,
}) {
  // Создание ссылки на текущий компонент
  const taskListRef = useRef(null);
  // Создание состояния для новой задачи, а также для фильтра по имени
  const [newTask, setNewTask] = useState(null);
  const [filterName, setFilterName] = useState('');

  // Создание новой задачи и добавление ее в общий список
  useEffect(() => {
    if (newTask) {
      const newTaskItem = {
        id: uuidv4(),
        name: newTask.name,
        complete: false,
        descr: '',
      };
      updateTasks([...tasks, newTaskItem]);
    }
  }, [newTask]);

  // Удаление задачи из общего списка
  const removeTask = (taskId) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  // Изменение состояния выполнения задачи
  const toggleTask = (taskId) => {
    updateTasks([
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
  };

  // Реализация изменения ширины общего списка задач
  let downed;
  let x;

  function stopStretch() {
    downed = false;
  }

  function saveX(e) {
    downed = true;
    if (e) {
      x = e.pageX;
    } else {
      x = window.event.clientX;
    }
  }

  function moveBlock(e) {
    if (downed) {
      if (e) {
        x = e.pageX;
      } else {
        x = window.event.clientX;
      }
      if (x < 800 && x > 320) {
        taskListRef.current.style.width = `${x}px`;
      }
    }
  }

  document.addEventListener('mouseup', stopStretch);
  document.addEventListener('mousemove', moveBlock);

  // Создание списка задач без фильтров
  const allTodos = tasks
    .map((task) => (
      <TodoTask
        task={task}
        key={task.id}
        toggleTask={toggleTask}
        removeTask={removeTask}
        changeCurrentTask={changeCurrentTask}
        currentTask={currentTask}
      />
    ))
    .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  let filterList = [];

  // Создание списка задач с фильтром по имени
  if (filterName) {
    filterList = tasks
      .filter((task) => task.name.includes(filterName))
      .map((task) => (
        <TodoTask
          task={task}
          key={task.id}
          toggleTask={toggleTask}
          removeTask={removeTask}
          changeCurrentTask={changeCurrentTask}
          currentTask={currentTask}
        />
      ))
      .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  }

  // Рендер компонента списка задач
  return (
    <section className="todo__tasks" ref={taskListRef}>
      <h2 className="tasks__title">All tasks</h2>
      <TodoNewTask addTask={setNewTask} />
      <SearchTask setFilterName={setFilterName} />
      <ul className={cn('tasks__list', { _scroll: tasks.length > 16 })}>
        {filterName ? filterList : allTodos}
      </ul>
      <div id="resize" onMouseDown={saveX} />
    </section>
  );
}

export default TasksList;
