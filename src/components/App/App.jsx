/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import TodoList from '../TasksList/TasksList';
import TodoEdit from '../EditTask/EditTask';
import './App.scss';

function App() {
  // Создание состояния для списка задач и выбранной задачи
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});

  // Получение сохраненнных задач из локального хранилища
  const savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
  useEffect(() => {
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // При каждом обновлении состояния задач обновляется локальное хранилище
  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Обновление состояния списка задач
  function updateTasks(taskList) {
    setTasks(taskList);
  }

  // Обновление выбранной задачи
  function changeCurrentTask(task) {
    setCurrentTask(task);
  }

  // Рендер главного компонента страницы
  return (
    <main className="todo">
      <TodoList
        tasks={tasks}
        updateTasks={updateTasks}
        changeCurrentTask={changeCurrentTask}
        currentTask={currentTask}
      />
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
