import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoNewTask from '../TodoNewTask/TodoNewTask';
import TodoTask from '../TodoTask/TodoTask';
import './TodoList.scss';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(null);

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

  const toggleTask = (taskId) => {
    setTasks([
      // eslint-disable-next-line max-len
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
  };

  return (
    <section className="todo__list list">
      <h2 className="list__title">All tasks</h2>
      <TodoNewTask addTask={setNewTask} />
      <ul className="todo__task-list">
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
            .sort((el) => (el.props.task.complete ? 1 : -1))
          : null}
      </ul>
    </section>
  );
}

export default TodoList;
