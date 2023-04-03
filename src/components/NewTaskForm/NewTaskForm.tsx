import React, { useState } from "react";
import "./NewTaskForm.scss";

interface NewTaskFormProps {
  addTask: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}

function NewTaskForm({ addTask }: NewTaskFormProps) {
  // Создание состояния для ввода названия задачи
  const [taskNameInput, setTaskNameInput] = useState<string>("");
  const minLength = 4;

  // Создание новой задачи в списке задач
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({ name: taskNameInput });
    setTaskNameInput("");
  };

  // Создание новой задачи в списке задач при нажатии на кнопку 'Enter',
  // при условии, что пользователь ввел валидную длину названия задачи
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskNameInput.length > minLength) {
      addTask({ name: taskNameInput });
      setTaskNameInput("");
    }
  };

  // Рендер компонента по созданию новой задачи
  return (
    <form
      className="todo__new-task new-task"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <input
        className="new-task__input _custom-input"
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
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
