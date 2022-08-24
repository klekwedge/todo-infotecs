/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import TodoNewTask from '../TodoNewTask/TodoNewTask';
import TodoTask from '../TodoTask/TodoTask';
import './TodoList.scss';
import SearchTask from '../SearchTask/SearchTask';

function TodoList({ changeCurrentTask, tasks, updateTasks }) {
  const taskListRef = useRef(null);
  const [newTask, setNewTask] = useState(null);
  const [filterName, setFilterName] = useState('');

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

  const removeTask = (taskId) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  const toggleTask = (taskId) => {
    updateTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
  };

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

  const allTodos = tasks
    .map((task) => (
      <TodoTask
        task={task}
        key={task.id}
        toggleTask={toggleTask}
        removeTask={removeTask}
        changeCurrentTask={changeCurrentTask}
      />
    ))
    .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  let filterList = [];

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
        />
      ))
      .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  }

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

export default TodoList;
