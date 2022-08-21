import React, { useState } from 'react';
import './TodoNewTask.scss';

function TodoNewTask({ addTask }) {
  const [taskNameInput, setTaskNameInput] = useState('');
  const minLength = 4;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name: taskNameInput });
    setTaskNameInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && taskNameInput.length > minLength) {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo__new-task new-task" onSubmit={handleSubmit}>
      <input
        className="new-task__input"
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        onKeyDown={handleKeyPress}
        required
        minLength={minLength}
        placeholder="Enter the name of your task"
      />
      <button type="submit" className="new-task__button">
        Add
      </button>
    </form>
  );
}

export default TodoNewTask;
