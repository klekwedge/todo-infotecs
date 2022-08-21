import React from 'react';
import TodoList from '../TodoList/TodoList';
import TodoEdit from '../TodoEdit/TodoEdit';
import './App.scss';

function App() {
  return (
    <main className="todo">
      <TodoList />
      <TodoEdit />
    </main>
  );
}

export default App;
