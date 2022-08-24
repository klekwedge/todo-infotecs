/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './SearchTask.scss';

function SearchTask({ setFilterName }) {
  // Создание состояния для поиска задачи по имени
  const [taskNameInput, setTaskNameInput] = useState('');

  // Создание состояния для названия задачи, которую ищет пользователь
  const [filter, setFilter] = useState('');

  // Изменение состояния фильтра по имени
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(taskNameInput);
    setFilterName(taskNameInput);
  };

  // Изменение состояния фильтра по имени при нажатии на кнопку 'Enter'
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && taskNameInput) {
      handleSubmit(e);
    }
  };

  // Сброс фильтра
  const resetFilter = () => {
    setTaskNameInput('');
    setFilter('');
    setFilterName('');
  };

  // Рендер компонента по созданию фильтра
  return (
    <>
      <form className="todo__search search" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search task"
          placeholder="Search task"
          className="search__input _custom-input"
          value={taskNameInput}
          onChange={(e) => setTaskNameInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className="search__button _btn">
          Search
        </button>
      </form>

      {filter ? (
        <div className="search__clear clear" onClick={resetFilter}>
          <h2 className="clear__title">
            {filter.length > 20 ? `${filter.slice(0, 20)}...` : filter}
          </h2>
          <AiOutlineClose color="white" />
        </div>
      ) : null}
    </>
  );
}

export default SearchTask;
