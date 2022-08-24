import React, { useState } from 'react';
import './NewTaskForm.scss';

function NewTaskForm({ addTask }) {
  // Создание состояния для ввода названия задачи
  const [taskNameInput, setTaskNameInput] = useState('');
  const minLength = 4;

  // Создание новой задачи в списке задач
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name: taskNameInput });
    setTaskNameInput('');
  };

  // Создание новой задачи в списке задач при нажатии на кнопку 'Enter',
  // при условии, что пользователь ввел валидную длину названия задачи
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && taskNameInput.length > minLength) {
      handleSubmit(e);
    }
  };

  // Рендер компонента по созданию новой задачи
  return (
    <form className="todo__new-task new-task" onSubmit={handleSubmit}>
      <input
        className="new-task__input _custom-input"
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        onKeyDown={handleKeyPress}
        required
        minLength={minLength}
        placeholder="Enter the name of your task"
      />
      <button type="submit" className="new-task__button _btn">
        Add
      </button>
    </form>
  );
}

export default NewTaskForm;
