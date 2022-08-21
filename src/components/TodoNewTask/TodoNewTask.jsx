import React, { useState } from 'react';
import './TodoNewTask.scss';

function TodoNewTask({ addTask }) {
  const [taskNameInput, setTaskNameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name: taskNameInput });
    setTaskNameInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo__new-task new-task" onSubmit={handleSubmit}>
      <input
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        onKeyDown={handleKeyPress}
        required
        minLength="3"
        placeholder="Enter the name of your task"
      />
      <button type="submit" className="new-task__button">
        Add
      </button>
    </form>
  );
}

export default TodoNewTask;
