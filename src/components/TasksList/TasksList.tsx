import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskItem from '../TaskItem/TaskItem';
import SearchTask from '../SearchTask/SearchTask';
import './TasksList.scss';
import { ITaskItem } from '../../types/TaskItem.type';

interface ITasksListProps {
  tasks: ITaskItem[];
  updateTasks: (taskList: ITaskItem[]) => void;
  changeCurrentTask: (task: ITaskItem | null) => void;
  currentTask: ITaskItem | null;
}

function TasksList({
  tasks,
  updateTasks,
  changeCurrentTask,
  currentTask,
}: ITasksListProps): JSX.Element {
  // Создание ссылки на текущий компонент
  const taskListRef = useRef<HTMLElement>(null);
  // Создание состояния для новой задачи, а также для фильтра по имени
  const [newTask, setNewTask] = useState<{ name: string } | null>(null);
  const [filterName, setFilterName] = useState<string>('');

  // Создание новой задачи и добавление ее в общий список
  useEffect(() => {
    if (newTask) {
      const newTaskItem: ITaskItem = {
        id: uuidv4(),
        name: newTask.name,
        complete: false,
        descr: '',
      };
      updateTasks([...tasks, newTaskItem]);
    }
  }, [newTask]);

  // Удаление задачи из общего списка
  const removeTask = (taskId: string) => {
    updateTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  // Изменение состояния выполнения задачи
  const toggleTask = (taskId: string) => {
    updateTasks([
      ...tasks.map((task) => (task.id === taskId ? { ...task, complete: !task.complete } : { ...task })),
    ]);
  };

  // Реализация изменения ширины общего списка задач
  let downed: boolean;
  let x: number;

  function stopStretch() {
    downed = false;
  }

  function saveX(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    downed = true;
    if (e) {
      x = e.pageX;
    } 
    // else if (window.event) {
    //   x = window.event.clientX;
    // }
  }

  function moveBlock(e: MouseEvent) {
    if (downed) {
      if (e) {
        x = e.pageX;
      } 
      // else if (window.event) {
      //   x = window.event.clientX;
      // }

      if (x < 800 && x > 320 && taskListRef.current) {
        taskListRef.current.style.width = `${x}px`;
      }
    }
  }

  document.addEventListener('mouseup', stopStretch);
  document.addEventListener('mousemove', moveBlock);

  // Создание списка задач без фильтров
  const allTodos = tasks
    .map((task) => (
      <TaskItem
        task={task}
        key={task.id}
        toggleTask={toggleTask}
        removeTask={removeTask}
        changeCurrentTask={changeCurrentTask}
        currentTask={currentTask}
      />
    ))
    .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  let filterList: JSX.Element[];

  // Создание списка задач с фильтром по имени
  if (filterName) {
    filterList = tasks
      .filter((task) => task.name.includes(filterName))
      .map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          toggleTask={toggleTask}
          removeTask={removeTask}
          changeCurrentTask={changeCurrentTask}
          currentTask={currentTask}
        />
      ))
      .sort((taskItem) => (taskItem.props.task.complete ? 1 : -1));
  } else {
    filterList = [];
  }

  // Рендер компонента списка задач
  return (
    <section className="todo__tasks" ref={taskListRef}>
      <h2 className="tasks__title">All tasks</h2>
      <NewTaskForm addTask={setNewTask} />
      <SearchTask setFilterName={setFilterName} />
      <ul className={cn('tasks__list', { _scroll: tasks.length > 16 })}>
        {filterName ? filterList : allTodos}
      </ul>
      <div id="resize" onMouseDown={saveX} />
    </section>
  );
}

export default TasksList;
