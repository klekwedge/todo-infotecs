import React, { useState, useEffect } from 'react';
import TodoNewTask from '../TodoNewTask/TodoNewTask';
import './TodoList.scss';

function TodoList() {
  return (
    <section className="todo__list list">
      <h2 className="list__title">All tasks</h2>
      <TodoNewTask />
    </section>
  );
}

export default TodoList;
