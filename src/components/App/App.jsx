/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoEdit from '../TodoEdit/TodoEdit';
import './App.scss';

function App() {
  const [currentTask, setCurrentTask] = useState({});

  function changeCurrentTask(task) {
    setCurrentTask(task);
  }

  // function changeCurrentTask(task) {
  //   setCurrentTask(task);
  // }

  return (
    <main className="todo">
      <TodoList changeCurrentTask={changeCurrentTask} />
      <TodoEdit currentTask={currentTask} />
    </main>
  );
}

export default App;
