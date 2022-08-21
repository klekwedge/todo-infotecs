/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import TodoNewTask from '../TodoNewTask/TodoNewTask';
import TodoTask from '../TodoTask/TodoTask';
import './TodoList.scss';

function TodoList() {
  const taskListRef = useRef(null);
  const taskResizeRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(null);
  // useScrollbar(todoListScrollWrapper, hasScroll);

  useEffect(() => {
    if (newTask) {
      const newTaskItem = {
        id: uuidv4(),
        name: newTask.name,
        complete: false,
      };
      setTasks([...tasks, newTaskItem]);
    }
  }, [newTask]);

  const removeTask = (taskId) => {
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  /// ///
  /// //
  /// //
  ///

  let downed;
  let el;
  let x;
  let deltaX = 0;

  function stopStretch() {
    downed = false;
  }

  function saveY(e) {
    downed = true;
    if (e) {
      x = e.pageX;
    } else {
      x = window.event.clientX;
    }
    e = e || window.event;
    el = e.target || e.srcElement;
    // console.log(el.offsetLeft);
    deltaX = el.offsetLeft;
  }

  function moveBlock(e) {
    if (downed == true) {
      if (e) {
        x = e.pageX;
      } else {
        x = window.event.clientX;
      }
      if (x < 800 && x > 260) {
        const new_x = x;
        taskListRef.current.style.width = `${new_x}px`;
      }
    }
  }

  if (taskListRef.current) {
    taskListRef.current.addEventListener('mousedown', saveY);
  }

  document.addEventListener('mouseup', stopStretch);
  document.addEventListener('mousemove', moveBlock);

  const toggleTask = (taskId) => {
    setTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
  };

  return (
    <section className="todo__tasks pan1" ref={taskListRef}>
      <h2 className="tasks__title">All tasks</h2>
      <TodoNewTask addTask={setNewTask} />
      <ul className={cn('tasks__list', { _scroll: tasks.length > 16 })}>
        {tasks.length > 0
          ? tasks
            .map((task) => (
              <TodoTask
                task={task}
                key={task.id}
                toggleTask={toggleTask}
                removeTask={removeTask}
              />
            ))
            .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1))
          : null}
      </ul>
      <div id="resize" ref={taskResizeRef} />
    </section>
  );
}

export default TodoList;
