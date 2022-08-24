/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoEdit from '../TodoEdit/TodoEdit';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const savedTask = JSON.parse(localStorage.getItem('savedTasks'));
  console.log(savedTask);

  useEffect(() => {
    if (savedTask) {
      setTasks(savedTask);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
  }, [tasks]);

  function updateTasks(taskList) {
    setTasks(taskList);
  }

  function changeCurrentTask(task) {
    setCurrentTask(task);
  }

  return (
    <main className="todo">
      <TodoList tasks={tasks} updateTasks={updateTasks} changeCurrentTask={changeCurrentTask} />
      <TodoEdit
        tasks={tasks}
        updateTasks={updateTasks}
        changeCurrentTask={changeCurrentTask}
        currentTask={currentTask}
      />
    </main>
  );
}

export default App;
