/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoEdit from '../TodoEdit/TodoEdit';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});

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
