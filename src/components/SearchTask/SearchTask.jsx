/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './SearchTask.scss';

function SearchTask({ setFilterName }) {
  const [taskNameInput, setTaskNameInput] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(taskNameInput);
    setFilterName(taskNameInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && taskNameInput) {
      handleSubmit(e);
    }
  };

  const resetFilter = () => {
    setTaskNameInput('');
    setFilter('');
    setFilterName('');
  };

  return (
    <>
      <form className="todo__search search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          value={taskNameInput}
          onChange={(e) => setTaskNameInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search task..."
        />
        <button type="submit" className="search__button">
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
