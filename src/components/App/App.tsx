import { useEffect, useState } from 'react';
import TodoEdit from '../EditTask/EditTask';
import { ITaskItem } from '../../types/TaskItem.type';
import TasksList from '../TasksList/TasksList';
import './App.scss';

function App() {
  // Создание состояния для списка задач и выбранной задачи
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [currentTask, setCurrentTask] = useState<ITaskItem | null>(null);

  useEffect(() => {
    // Получение сохраненнных задач из локального хранилища
    // const savedTasks = JSON.parse(localStorage.getItem('savedTasks') || '');

    // if (savedTasks) {
    //   setTasks(savedTasks);
    // }
  }, []);

  // При каждом обновлении состояния задач обновляется локальное хранилище
  // useEffect(() => {
  //   localStorage.setItem('savedTasks', JSON.stringify(tasks));
  // }, [tasks]);

  // Обновление состояния списка задач
  function updateTasks(taskList: ITaskItem[]): void {
    setTasks(taskList);
  }

  // Обновление выбранной задачи
  function changeCurrentTask(task: ITaskItem | null): void {
    setCurrentTask(task);
  }

  // Рендер главного компонента страницы
  return (
    <main className="todo">
      <TasksList
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
